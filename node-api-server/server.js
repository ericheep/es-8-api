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


var numSamples = 44100;
var samples= [];
for (var i = 0; i < numSamples; i++)
  samples.push({});

io.on('connect', (socket) => {
  // io.emit('state', state)
  console.log('connected')

  socket.on('sequencer', (data) => {
    // store state
    samples[data.index] = {
      freq: data.freq
    }

    // send back to clients
    io.emit('sequencer', data)

    // send osc
    udpPort.send({
      address: '/sequencer',
      args: [
        {
          type: 'i',
          value: data.channel,
        },
        {
          type: 'f',
          value: data.freq,
        },
        {
          type: 'i',
          value: data.index,
        }
      ]
    }, '127.0.0.1', 12345)
  })
})

server.listen(3000)
