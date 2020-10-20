const { MessageEmbed } = require('discord.js')
const Commando = require('discord.js-commando')
const muteSchema = require('@schemas/mute-schema')

module.exports = class IsMutedCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: '_ismuted',
      group: 'moderation',
      memberName: '_ismuted',
      userPermissions: ['ADMINISTRATOR'],
      description: 'Displays mute information for a user',
      argsType: 'multiple',
    })
  }

  run = async (message, args) => {
    //!ismuted ID

    const { guild } = message

    if (args.length !== 1) {
      message.reply(`Correct syntax: ${guild.commandPrefix}ismuted <User ID>`)
      return
    }

    const id = args[0]

    const members = await guild.members.fetch()
    const target = members.get(id)
    const isInDiscord = !!target

    const currentMute = await muteSchema.findOne({
      userId: id,
      guildId: guild.id,
      current: true,
    })

    const embed = new MessageEmbed()
      .setAuthor(
        `Mute info for ${target ? target.user.tag : id}`,
        target ? target.user.displayAvatarURL() : ''
      )
      .addField('Currently muted', currentMute ? 'Yes' : 'No')
      .addField('Is in Discord', isInDiscord ? 'Yes' : 'No')

    if (currentMute) {
      const date = new Date(currentMute.expires)

      embed
        .addField('Muted by', `<@${currentMute.staffId}>`)
        .addField('Muted for', currentMute.reason.toLowerCase())
        .addField('Mute expires', `${date.toLocaleString()} EST`)
    }

    message.reply(embed)
  }
}
