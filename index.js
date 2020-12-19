const express = require('express')
const app = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http,{cors: {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"]
}})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

io.on("connection",(socket) => {
  console.log("A socket has connected.")
})

const port = process.env.PORT || 5000
http.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})