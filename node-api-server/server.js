// server.js

const express = require('express')
const bodyParser = require('body-parser')
const controlRouter = require('./routes/control')

const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 3128

const app = express()

// cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send("Welcome to the ES-8-API home page!")
})

app.use('/control', controlRouter)

app.listen(PORT, () => {
  console.log(`ES-8-API running on ${HOST}:${PORT}`)
})
