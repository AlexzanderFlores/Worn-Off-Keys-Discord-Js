const Commando = require('discord.js-commando')
const thanksSchema = require('@schemas/thanks-schema')

module.exports = class ThanksCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'thx',
      group: 'thanks',
      memberName: 'thx',
      description: 'Thanks a user for helping you',
    })
  }

  run = async (message) => {
    const target = message.mentions.users.first()
    if (!target) {
      message.reply('Please specify someone to thank')
      return
    }

    const { guild } = message
    const guildId = guild.id
    const targetId = target.id
    const authorId = message.author.id
    const now = new Date()

    if (targetId === authorId) {
      message.reply('You cannot thank yourself')
      return
    }

    const authorData = await thanksSchema.findOne({
      userId: authorId,
      guildId,
    })

    if (authorData && authorData.lastGave) {
      const then = new Date(authorData.lastGave)

      const diff = now.getTime() - then.getTime()
      const diffHours = Math.round(diff / (1000 * 60 * 60))

      const hours = 24
      if (diffHours <= hours) {
        message.reply(
          `You have already thanked someone within the last ${hours} hours.`
        )
        return
      }
    }

    // Update the "lastGave" property for the command sender
    await thanksSchema.findOneAndUpdate(
      {
        userId: authorId,
        guildId,
      },
      {
        userId: authorId,
        guildId,
        lastGave: now,
      },
      {
        upsert: true,
      }
    )

    // Increase how many thanks the target user has had
    const result = await thanksSchema.findOneAndUpdate(
      {
        userId: targetId,
        guildId,
      },
      {
        userId: targetId,
        guildId,
        $inc: {
          received: 1,
        },
      },
      {
        upsert: true,
        new: true,
      }
    )

    const amount = result.received
    message.reply(
      `You have thanked <@${targetId}>! They now have ${amount} thanks.`
    )
  }
}
