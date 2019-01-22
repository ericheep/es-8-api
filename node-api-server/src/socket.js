const ipaddress = require('ip-address')

const { updateSample } = require('./osc')
const { formatTime, getRangesOfFrequencies, getInitialState } = require('./helpers')

const { sequencer, samples } = getInitialState()

const onConnection = (io) => {
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
    const ipaddr = new ipaddress.Address4(socket.request.connection.remoteAddress)
    console.log(ipaddr)

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
