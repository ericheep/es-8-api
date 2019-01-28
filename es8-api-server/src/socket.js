const { oscUpdateSample } = require('./osc')
const { formatTime, getRangesOfFrequencies, getInitialState } = require('./helpers')
const { writeSample } = require('./db')

const { sequencer, samples } = getInitialState()
const ipAddresses = []

const initialSelectedArea = {
  startIndex: 0,
  endIndex: sequencer.samplesShown,
  scopedIndex: 0,
  samples: samples.slice(0, sequencer.samplesShown),
}

const updateSample = (data) => {
  const index = samples.findIndex((sample) => sample.index == data.index)
  console.log(data)

  samples[index] = {
    freq: data.freq,
    index: data.index,
    dateTime: data.dateTime,
  }
}

const storeIpAddress = (socket) => {
  const ipaddr = socket.request.connection.remoteAddress
  ipAddresses.push(ipaddr)
}

const checkIpAddress = (socket) => {
  const ipaddr = socket.request.connection.remoteAddress
  return ipAddresses.includes(ipaddr)
}

const getTransportRanges = () => {
  const frequencies = samples.map((sample) => sample.freq)
  return getRangesOfFrequencies(frequencies, sequencer.width)
}

const initializeClient = (socket) => {
  socket.emit('INITIALIZE_SEQUENCER', sequencer)
  socket.emit('UPDATE_SELECTED_AREA', initialSelectedArea)
  socket.emit('UPDATE_TRANSPORT_RANGES', getTransportRanges())
  socket.emit('UPDATE_UPTIME', formatTime(process.uptime() + ""))
  socket.emit('UPDATE_COMMIT_ALLOWED', !checkIpAddress(socket))
}

const onConnection = (io) => {
  io.on('connect', (socket) => {
    initializeClient(socket)

    socket.on('emitCommitPrimedSample', (data) => {
      updateSample(data)
      io.emit('UPDATE_COMMITTED_SAMPLE', data)
      socket.emit('UPDATE_TRANSPORT_RANGES', getTransportRanges())
      storeIpAddress(socket)
      socket.emit('UPDATE_COMMIT_ALLOWED', !checkIpAddress(socket))
    })

    socket.on('emitSelectedArea', (data) => {
      socket.emit('UPDATE_SELECTED_AREA', {
        startIndex: data.startIndex,
        endIndex: data.endIndex,
        samples: samples.slice(data.startIndex, data.endIndex),
      })
    })
  })
}

module.exports.onConnection = onConnection
