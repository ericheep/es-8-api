const osc = require('osc')
const http = require('http')
const ipaddress = require('ip-address')
const { formatTime, getRangesOfFrequencies } = require('./helpers')

const server = http.createServer()

const udpPort = new osc.UDPPort({
  localAddress: "localhost",
  localPort: 10001,
  metadata: true
})

udpPort.open();
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

var numSamples = 44100;
var samples = []

for (var i = 0; i < numSamples; i++) {
  samples.push({
    index: i,
    freq: null,
    dateTime: null,
  })
}

// 38hz to 24khz
// frequency response of my Yamaha hs4s
const sequencer = {
  frequencyResponse: [38.0, 24000.0],
  samplesShown: 100,
  length: samples.length,
}



io.on('connect', (socket) => {
  io.emit('INITIALIZE_SEQUENCER', sequencer)
  io.emit('UPDATE_SELECTED_AREA', {
    startIndex: 0,
    endIndex: sequencer.samplesShown,
    scopedIndex: 0,
    samples: samples.slice(0, sequencer.samplesShown),
  })
  io.emit('UPDATE_TRANSPORT_RANGES',
    getRangesOfFrequencies(samples.map((sample) => sample.freq), 760)
  )
  io.emit('UPDATE_UPTIME', formatTime(process.uptime() + ""))
  // const ipaddr = new ipaddress.Address6(socket.handshake.headers.origin)
  // console.log(ipaddr)

  socket.on('emitCommitPrimedSample', (data) => {
    const index = samples.findIndex((sample) => sample.index == data.index)
    console.log(data)

    samples[index] = {
      freq: data.freq,
      index: data.index,
      dateTime: data.dateTime,
    }

    io.emit('UPDATE_COMMITTED_SAMPLE', data)
    io.emit('UPDATE_TRANSPORT_RANGES',
      getRangesOfFrequencies(samples.map((sample) => sample.freq), 760)
    )

    /*
    // send osc to ChucK
    udpPort.send({
      address: '/updateSample',
      args: [
        {
          type: 'f',
          value: data.freq,
        },
        {
          type: 'i',
          value: data.index,
        }
      ]
    }, '127.0.0.1', 12345)*/
  })

  socket.on('emitSelectedArea', (data) => {
    io.emit('UPDATE_SELECTED_AREA', {
      startIndex: data.startIndex,
      endIndex: data.endIndex,
      samples: samples.slice(data.startIndex, data.endIndex),
    })
  })
})

server.listen(3000)
