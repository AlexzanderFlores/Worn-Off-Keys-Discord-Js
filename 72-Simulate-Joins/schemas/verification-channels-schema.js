const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const verificationChannelsSchema = mongoose.Schema({
  // Guild ID
  _id: reqString,
  channelId: reqString,
  roleId: reqString,
})

module.exports = mongoose.model(
  'verification-channels',
  verificationChannelsSchema
)
