const express = require('express')
const config = require("config");
const mongoose = require("mongoose")

const app = express()
const http = require("http").createServer(app)

mongoose.connect(config.mongoURI,{useNewUrlParser: true, useUnifiedTopology: true},(err) => {
  if(err) return console.error(err);
  console.log("Connected to the database")
})

app.use(express.json());
app.use("/api",require("./routes/api"))

const io = require("socket.io")(http,{
  cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
  }
});
io.on("connection",(socket) => require("./routes/sockets")(io, socket));

const port = process.env.PORT || 5000
http.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})