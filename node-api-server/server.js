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
var samples = [];
var scale = (24000.0 - 38.0) / numSamples

for (var i = 0; i < numSamples; i++) {
  samples.push({
    index: i,
    freq: i * scale + 38.0,
  })
}


const averagedFrequencies = (frequencies, width) => {
  const averagedFreqs = []
  const N = Math.floor(frequencies.length / width)
  const reducer = (acc, curr) => acc + curr

  for (var i = 0; i < width; i++) {
    const slice = frequencies.slice(i * N, (i + 1) * N)
    averagedFreqs[i] = slice.reduce(reducer) / slice.length
  }

  return averagedFreqs
}

const frequencies = samples.map((el) => el.freq)

// 38hz to 24khz
// frequency response of my Yamaha hs4s
const sequencer = {
  frequencyResponse: [38.0, 24000.0],
  samplesShown: 70,
  length: frequencies.length,
}

io.on('connect', (socket) => {
  io.emit('UPDATE_SEQUENCER', sequencer)
  console.log('connected')

  socket.on('updateSample', (data) => {
    // store state
    sequence[data.index] = {
      freq: data.freq,
      index: data.index,
    }

    // send back to clients
    io.emit('updateSample', data)

    // send osc to ChucK
    udpPort.send({
      address: '/updateSample',
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

  socket.on('emitSelectedArea', (data) => {
    io.emit('UPDATE_SELECTED_AREA_SAMPLES', samples.slice(data.startIndex, data.endIndex))
  })

  socket.on('emitGuideFrequencies', (width) => {
    io.emit('UPDATE_GUIDE_FREQUENCIES', averagedFrequencies(frequencies, width))
  })
})

server.listen(3000)
