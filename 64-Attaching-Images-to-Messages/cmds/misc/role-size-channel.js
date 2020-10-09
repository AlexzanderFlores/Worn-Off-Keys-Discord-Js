const Commando = require('discord.js-commando')
const roleSizeSchema = require('@schemas/role-size-schema')
const { fetchChannelData } = require('@features/role-size-channel')

module.exports = class RoleCounterCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'rolecounter',
      group: 'misc',
      memberName: 'rolecounter',
      userPermissions: ['ADMINISTRATOR'],
      description:
        'Enables a channel to count the number of members in a role or a guild',
      argsType: 'multiple',
    })
  }

  run = async (message, args) => {
    //!rolecounter 475984375894435 47543567435643 Python:

    const { guild } = message
    const syntax = `${guild.commandPrefix}roleCounter <Voice Channel ID> <Role ID or "all"> <Text>`

    if (args.length < 3) {
      message.reply(`Correct syntax: ${syntax}`)
      return
    }

    const channelId = args.shift()
    const channel = guild.channels.cache.get(channelId)
    if (!channel || channel.type !== 'voice') {
      message.reply(`You must provide a voice channel Id:\n${syntax}`)
      return
    }

    const roleId = args.shift().toLowerCase()
    if (roleId !== 'all') {
      const role = guild.roles.cache.get(roleId)
      if (!role) {
        message.reply(
          `You must provide either a valid role Id or the word "all" for all guild members:\n${syntax}`
        )
        return
      }
    }

    const text = args.join(' ')

    await roleSizeSchema.findOneAndUpdate(
      {
        guildId: guild.id,
        channelId,
      },
      {
        guildId: guild.id,
        channelId,
        roleId,
        text,
      },
      {
        upsert: true,
      }
    )

    message.reply('Voice channel counter set!')

    fetchChannelData()
  }
}
