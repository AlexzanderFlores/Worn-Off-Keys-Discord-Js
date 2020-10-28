const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const tempChannelsSchema = mongoose.Schema({
  guildId: reqString,
  channelId: reqString,
  userId: reqString,
  expires: Date,
})

module.exports = mongoose.model('temp-channels', tempChannelsSchema)
