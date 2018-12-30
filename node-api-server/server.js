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

var numSamples = 4410;
var sequence= [];
for (var i = 0; i < numSamples; i++) {
  sequence.push({
    channel: 0,
    index: i,
    freq: 440,
  })
}

// 38hz to 24khz
// frequency response of my Yamaha hs4s
const state = {
  sequence,
  frequencyResponse: [38.0, 24000.0],
}

io.on('connect', (socket) => {
  io.emit('state', state)
  console.log('connected')

  socket.on('changeSequence', (data) => {
    // store state
    sequence[data.index] = {
      channel: data.channel,
      freq: data.freq,
      index: data.index,
    }

    // send back to clients
    io.emit('changeSequence', data)

    // send osc to ChucK
    udpPort.send({
      address: '/changeSequence',
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
