const osc = require('osc')

const udpPort = new osc.UDPPort({
  localAddress: "localhost",
  localPort: 10001,
  metadata: true
})

udpPort.open()

// send osc to ChucK
const oscUpdateSample = (data) => {
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
  }, '127.0.0.1', 12345)
}

module.exports.oscUpdateSample = oscUpdateSample
