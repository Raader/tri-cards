const express = require('express')
const config = require("config");
const mongoose = require("mongoose")

const app = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http,{cors: {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"]
}})

mongoose.connect(config.mongoURI,{useNewUrlParser: true, useUnifiedTopology: true},(err) => {
  if(err) return console.error(err);
  console.log("Connected to the database")
})

app.use(express.json());
app.use("/api",require("./routes/api"))

const sockets = {}
io.on("connection",(socket) => {
  console.log("A socket has connected.")
  sockets[socket.id] = socket;
  const userList = Object.keys(sockets).filter((id) => sockets[id] ? true : false);
  console.log(userList);

  socket.on("subToUserList",() => {
    socket.join("userListSubs");
    socket.emit("userList",userList);
  })
  socket.on("unsubFromUserList", () => {
    socket.leave("userListSubs");
  })
  socket.on("disconnect", () => {
    sockets[socket.id] = undefined;
    const userList = Object.keys(sockets).filter((id) => sockets[id] ? true : false);
    io.emit("userList",userList)
  })
  io.to("userListSubs").emit("userList",userList);
})



const port = process.env.PORT || 5000
http.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})