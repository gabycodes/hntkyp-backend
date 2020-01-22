require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

const hntkypRouter = require('./routes/plants')
app.use('/plants', hntkypRouter)

var router = express.Router();

app.listen(8080, () => console.log('server started'))

module.exports = router