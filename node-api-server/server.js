const http = require('http')
const server = http.createServer()
const osc = require('osc')

const udpPort = new osc.UDPPort({
  localAddress: "localhost",
  localPort: 10001,
  metadata: true
})

udpPort.open();

const allowedOrigins = "http://localhost:* http://127.0.0.1:*";
const wtc = require('wrtc')

const io = require('socket.io')(server, {
  path: '/',
  serveClient: false,
  origins: allowedOrigins,

  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
})

const state = {
  tempo: '120',
}

io.on('connect', (socket) => {
  io.emit('state', state)
  console.log('connected')

  socket.on('tempo', (data) => {
    state.tempo = data
    io.emit('tempo', data)
  })

  socket.on('freqLoop', (data) => {
    udpPort.send({
      address: "/freqLoop",
      args: [
        {
          type: "i",
          value: data.channel,
        },
        {
          type: "f",
          value: data.freq,
        },
        {
          type: "i",
          value: data.index,
        }
      ]
    }, "127.0.0.1", 12345);
  })
})

server.listen(3000)
