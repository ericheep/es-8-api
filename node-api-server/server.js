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
var scale = (24000.0 - 38.0) / numSamples
var harmonic = 55.0

for (var i = 0; i < numSamples; i++) {
  samples.push({
    index: i,
    freq: harmonic,
  })
  harmonic *= 2
  if (harmonic >= 24000) {
    harmonic = 55.0
  }
}

const formatTime = (time) => {
  var sec_num = parseInt(time, 10);
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  var time    = hours+':'+minutes+':'+seconds;
  return time;
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
  io.emit('INITIALIZE_SEQUENCER', sequencer)
  io.emit('UPDATE_UPTIME', formatTime(process.uptime() + ""))
  io.emit('UPDATE_SELECTED_AREA_SAMPLES', samples.slice(0, sequencer.samplesShown))
  console.log('connected')

  socket.on('emitUpdateSample', (data) => {
    const index = samples.findIndex((sample) => sample.index = data.index)

    samples[index] = {
      freq: data.freq,
      index: data.index,
    }

    io.emit('UPDATE_SAMPLE', data)

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
    io.emit('UPDATE_SELECTED_AREA_SAMPLES', samples.slice(data.startIndex, data.endIndex))
  })

  socket.on('emitTransportFrequencies', (width) => {
    io.emit('UPDATE_TRANSPORT_FREQUENCIES', averagedFrequencies(frequencies, width))
  })
})

server.listen(3000)
