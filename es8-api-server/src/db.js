const Influx = require('influx')

const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'es-8',
  schema: [
    {
      measurement: 'sample',
      fields: {
        index: Influx.FieldType.INTEGER,
        frequency: Influx.FieldType.FLOAT,
        ipAddress: Influx.FieldType.STRING,
      },
      tags: [],
    }
  ]
})

const writeSample = (index, frequency, ipAddress) => {
  influx.writePoints([
    {
      measurement: 'sample',
      // tags: { host: os.hostname() },
      fields: {
        index: index,
        frequency: frequency,
        ipAddress: ipAddress,
      },
    }
  ], {
    database: 'es-8',
    precision: 's',
  }).catch(error => {
    console.error(`Error saving data to InfluxDB! ${err.stack}`)
  })
}

module.exports.writeSample = writeSample
