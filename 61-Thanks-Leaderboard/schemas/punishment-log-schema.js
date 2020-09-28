const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const punishmentLogSchema = mongoose.Schema(
  {
    guildId: reqString,
    userId: reqString,
    command: reqString,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('punishment-logs', punishmentLogSchema)
