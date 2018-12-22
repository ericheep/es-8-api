// routes/projects.js

const osc = require('osc')
const express = require('express')
const router = express.Router()

const udpPort = new osc.UDPPort({
  localAddress: "localhost",
  localPort: 10001,
  metadata: true
})

udpPort.open();

router.get('/:freq', async (req, res) => {
  const freq = req.params.freq;

  udpPort.send({
    address: "/freq",
    args: [
      {
        type: "f",
        value: freq
      }
    ]
  }, "127.0.0.1", 12345);
})

module.exports = router
