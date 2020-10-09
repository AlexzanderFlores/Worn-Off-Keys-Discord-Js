const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const muteSchema = mongoose.Schema(
  {
    userId: reqString,
    guildId: reqString,
    reason: reqString,
    staffId: reqString,
    staffTag: reqString,
    expires: {
      type: Date,
      required: true,
    },
    current: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('mutes-testing', muteSchema)
