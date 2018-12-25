const http = require('http')
const server = http.createServer()
const allowedOrigins = "http://localhost:* http://127.0.0.1:*";

const io = require('socket.io')(server, {
  path: '/',
  serveClient: false,
  origins: allowedOrigins,

  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
})

io.on('connect', (socket) => {
  console.log('connected')
})

server.listen(3000)
