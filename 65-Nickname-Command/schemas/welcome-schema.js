const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const welcomeSchema = mongoose.Schema({
  _id: reqString,
  channelId: reqString,
  text: reqString,
})

module.exports = mongoose.model('welcome-channels', welcomeSchema)
