const osc = require('osc')
const http = require('http')
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
    freq: (38 + i) % 24000,
    dateTime: null,
  })
}

const frequencies = samples.map((el) => el.freq)

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

const rangesOfFrequencies = (frequencies, width) => {
  const ranges = []
  const N = Math.floor(frequencies.length / width)

  for (var i = 0; i < width; i++) {
    const slice = frequencies.slice(i * N, (i + 1) * N)
    ranges[i] = [Math.min.apply(null, slice), Math.max.apply(null, slice)]
  }

  return ranges
}


// 38hz to 24khz
// frequency response of my Yamaha hs4s
const sequencer = {
  frequencyResponse: [38.0, 24000.0],
  samplesShown: 100,
  length: frequencies.length,
}

const selectedArea = {
  samples: samples.slice(0, sequencer.samplesShown),
  startIndex: 0,
  endIndex: sequencer.samplesShown,
  scopedIndex: 0,
}

io.on('connect', (socket) => {
  io.emit('INITIALIZE_SEQUENCER', sequencer)
  io.emit('UPDATE_SELECTED_AREA', selectedArea)
  io.emit('UPDATE_UPTIME', formatTime(process.uptime() + ""))
  console.log('connected')

  socket.on('emitCommitPrimedSample', (data) => {
    const index = samples.findIndex((sample) => sample.index == data.index)
    console.log(data)

    samples[index] = {
      freq: data.freq,
      index: data.index,
      dateTime: data.dateTime,
    }

    io.emit('UPDATE_COMMITTED_SAMPLE', data)

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
      scopedIndex: data.scopedIndex,
      samples: samples.slice(data.startIndex, data.endIndex),
    })
  })

  socket.on('emitTransportRanges', (width) => {
    io.emit('UPDATE_TRANSPORT_RANGES', rangesOfFrequencies(frequencies, width))
  })
})

server.listen(3000)
