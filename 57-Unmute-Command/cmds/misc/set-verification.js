const Commando = require('discord.js-commando')
const verificationSchema = require('@schemas/verification-channels-schema')
const { fetch } = require('@features/verification-channels')

module.exports = class SetVerificationCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'setverification',
      group: 'misc',
      memberName: 'setverification',
      description: 'Sets the verification channel for the Discord',
      userPermissions: ['ADMINISTRATOR'],
      argsType: 'multiple',
    })
  }

  async run(message, args) {
    const seconds = 3

    if (args.length !== 2) {
      message
        .reply('You must provide an emoji to react with and a role ID')
        .then((message) => {
          message.delete({
            timeout: 1000 * seconds,
          })
        })

      message.delete()
      return
    }

    const { guild, channel } = message

    let emoji = args[0]
    if (emoji.includes(':')) {
      const split = emoji.split(':')
      const emojiName = split[1]

      emoji = guild.emojis.cache.find((emoji) => {
        return emoji.name === emojiName
      })
    }

    const roleId = args[1]

    const role = guild.roles.cache.get(roleId)

    if (!role) {
      message.reply('That role does not exist').then((message) => {
        message.delete({
          timeout: 1000 * seconds,
        })
      })

      message.delete()
      return
    }

    message.delete().then(() => {
      channel.messages.fetch({ limit: 1 }).then(async (results) => {
        const firstMessage = results.first()

        if (!firstMessage) {
          channel.send('There is no message to react to').then((message) => {
            message.delete({
              timeout: 1000 * seconds,
            })
          })

          return
        }

        firstMessage.react(emoji)

        await verificationSchema.findOneAndUpdate(
          {
            _id: guild.id,
          },
          {
            _id: guild.id,
            channelId: channel.id,
            roleId,
          },
          {}
        )

        await fetch()
      })
    })
  }
}
