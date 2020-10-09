const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const roleSizeSchema = mongoose.Schema({
  guildId: reqString,
  channelId: reqString,
  roleId: reqString,
  text: reqString,
})

module.exports = mongoose.model('role-size-channels', roleSizeSchema)
