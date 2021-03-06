//requirements
const express = require('express')
const config = require("config");
const mongoose = require("mongoose")
const path = require("path");

//initialize express app
const app = express()
const http = require("http").createServer(app)

//connect to the database
mongoose.connect(config.mongoURI,{useNewUrlParser: true, useUnifiedTopology: true},(err) => {
  if(err) return console.error(err);
  console.log("Connected to the database")
})

//use routes and middleware
app.use(express.json()); //json body parser for POST requests
app.use("/api",require("./routes/api"));

//open socket
const io = require("socket.io")(http,{
  cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
  }
});
io.use(require("./middleware/identify"));
io.on("connection",(socket) => require("./routes/sockets")(io, socket));

//serve client
if(process.env.NODE_ENV === "production"){
    
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req,res) =>{
      res.sendFile(path.resolve(__dirname,"client","build","index.html"));
  })
}

//set port and listen
const port = process.env.PORT || 5000
http.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})