const mongoose = require('mongoose')

const plantSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  latinName: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('Plant', plantSchema)