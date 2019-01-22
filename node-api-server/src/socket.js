const { oscUpdateSample } = require('./osc')
const { formatTime, getRangesOfFrequencies, getInitialState } = require('./helpers')

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

const initializeClient = (socket) => {
  socket.emit('INITIALIZE_SEQUENCER', sequencer)
  socket.emit('UPDATE_SELECTED_AREA', initialSelectedArea)
  socket.emit('UPDATE_TRANSPORT_RANGES',
    getRangesOfFrequencies(samples.map((sample) => sample.freq), 760)
  )
  socket.emit('UPDATE_UPTIME', formatTime(process.uptime() + ""))
  socket.emit('UPDATE_COMMIT_ALLOWED', !checkIpAddress(socket))
}

const onConnection = (io) => {
  io.on('connect', (socket) => {
    initializeClient(socket)

    socket.on('emitCommitPrimedSample', (data) => {
      io.emit('UPDATE_COMMITTED_SAMPLE', data)
      io.emit('UPDATE_TRANSPORT_RANGES',
        getRangesOfFrequencies(samples.map((sample) => sample.freq), 760)
      )
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
