const mongoose = require('mongoose')

const messageCountSchema = mongoose.Schema({
  // The user ID
  _id: {
    type: String,
    required: true,
  },

  // How many messages they have sent
  messageCount: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('message-counts', messageCountSchema)
