const http = require('http')
const { onConnection } = require('./socket')

const server = http.createServer()
const io = require('socket.io')(server, {
  path: '/',
  serveClient: false,
  origins: 'http://localhost:* http://127.0.0.1:*',

  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
})

onConnection(io)
server.listen(3000, '0.0.0.0')
