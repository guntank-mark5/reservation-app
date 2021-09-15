const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/dev')
const FakeDb = require('./fake-db')

const productRoutes = require('./routes/products')

mongoose.connect(
  // 'mongodb://localhost:27017/test'
  config.DB_URI
).then(
  () => {
    const fakeDb = new FakeDb()
    fakeDb.initDb()
    console.log('OK')
  }
)

const app = express()

app.use('/api/v1/products', productRoutes)

const PORT = process.env.PORT || '3001'

app.listen(PORT, function () {
  console.log(PORT + ' running')
})
