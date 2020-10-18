const Commando = require('discord.js-commando')
const tempChannelSchema = require('@schemas/temp-channels-schema')

module.exports = class TempChannelCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'tempchannel',
      group: 'misc',
      memberName: 'tempchannel',
      userPermissions: ['ADMINISTRATOR'],
      description: 'Creates a temporary channel',
    })
  }

  run = async (message) => {
    const { guild, member } = message
    const guildId = guild.id
    const memberId = member.id

    const results = await tempChannelSchema.findOne({
      guildId,
      memberId,
    })

    if (results) {
      message.reply('You already have a temporary channel')
      return
    }

    message.reply('You have been tagged in a channel, please check it.')

    const role = guild.roles.cache.find((role) => {
      return role.name === '@everyone'
    })

    const newChannel = await guild.channels.create('Test Temp Channel', {
      parent: '464318590632460291', // Community category
      permissionOverwrites: [
        {
          id: role.id, // Everyone role
          deny: ['VIEW_CHANNEL'],
        },
        {
          id: memberId,
          allow: ['VIEW_CHANNEL'],
        },
      ],
    })

    newChannel.send('Hello world')

    const expires = new Date()
    expires.setMinutes(expires.getMinutes() + 1)

    await new tempChannelSchema({
      guildId,
      channelId: newChannel.id,
      userId: memberId,
      expires,
    }).save()
  }
}
