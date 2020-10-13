const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const thanksLeaderboardSchema = mongoose.Schema({
  // Guild ID
  _id: reqString,
  channelId: reqString,
})

module.exports = mongoose.model('thanks-leaderboards', thanksLeaderboardSchema)
