const warnSchema = require('@schemas/warn-schema')
const punishmentLogSchema = require('@schemas/punishment-log-schema')

module.exports = {
  commands: 'warn',
  minArgs: 2,
  expectedArgs: "<Target user's @> <reason>",
  requiredRoles: ['Moderator'],
  callback: async (message, arguments) => {
    const target = message.mentions.users.first()
    if (!target) {
      message.reply('Please specify someone to warn.')
      return
    }

    arguments.shift()

    const guildId = message.guild.id
    const userId = target.id
    const reason = arguments.join(' ')

    const warning = {
      author: message.member.user.tag,
      timestamp: new Date().getTime(),
      reason,
    }

    await warnSchema.findOneAndUpdate(
      {
        guildId,
        userId,
      },
      {
        guildId,
        userId,
        $push: {
          warnings: warning,
        },
      },
      {
        upsert: true,
      }
    )

    await new punishmentLogSchema({
      guildId,
      userId,
      command: message.content,
    }).save()
  },
}
