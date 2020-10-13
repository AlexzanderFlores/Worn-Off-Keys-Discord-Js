const warnSchema = require('@schemas/warn-schema')

module.exports = {
  commands: ['listwarnings', 'lw'],
  minArgs: 1,
  expectedArgs: "<Target user's @>",
  requiredRoles: ['Moderator'],
  callback: async (message, arguments, text) => {
    const target = message.mentions.users.first()
    if (!target) {
      message.reply('Please specify a user to load the warnings for.')
      return
    }

    const guildId = message.guild.id
    const userId = target.id

    const results = await warnSchema.findOne({
      guildId,
      userId,
    })

    let reply = `Previous warnings for <@${userId}>:\n\n`

    for (const warning of results.warnings) {
      const { author, timestamp, reason } = warning

      reply += `By ${author} on ${new Date(
        timestamp
      ).toLocaleDateString()} for "${reason}"\n\n`
    }

    message.reply(reply)
  },
}
