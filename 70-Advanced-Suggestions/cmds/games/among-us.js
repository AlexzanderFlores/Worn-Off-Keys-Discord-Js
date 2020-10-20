const Commando = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')

const amongUsCategorySchema = require('@schemas/among-us-category-schema')

const channelNameStart = 'Among Us'

module.exports = class AmongUsCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'au',
      group: 'games',
      memberName: 'au',
      description: 'Makes it easier to play "Among Us" with friends',
      argsType: 'multiple',
    })

    client.on('voiceStateUpdate', (oldState) => {
      const { channel } = oldState

      if (
        channel &&
        channel.name.startsWith(channelNameStart) &&
        channel.members.size === 0
      ) {
        channel.delete()
        console.log(`Deleting channel "${channel.name}"`)
      }
    })
  }

  run = async (message, args) => {
    //!au <Region> <Code>
    const [region, code] = args

    if (!region) {
      message.reply('Please specify a region')
      return
    }

    if (!code) {
      message.reply('Please specify the game code')
      return
    }

    const { channel, guild, member } = message

    const categoryDocument = await amongUsCategorySchema.findOne({
      _id: guild.id,
    })

    if (!categoryDocument) {
      message.reply('An Among Us category has not been set within this server')
      return
    }

    const channelName = `${channelNameStart} "${code}"`
    await guild.channels.create(channelName, {
      type: 'voice',
      userLimit: 10,
      parent: categoryDocument.categoryId,
    })

    const embed = new MessageEmbed()
      .setAuthor(
        member.nickname || member.displayName,
        member.user.displayAvatarURL()
      )
      .setDescription(
        `${member} created a new Among Us game! Join channel "${channelName}"`
      )
      .addField('Region', region)
      .addField('Game Code', code)

    channel.send(embed)
  }
}
