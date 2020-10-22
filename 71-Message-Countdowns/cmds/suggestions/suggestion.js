const Commando = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')
const { statusMessages, suggestionCache } = require('@features/suggestions')

module.exports = class SuggestionCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'suggestion',
      group: 'suggestions',
      memberName: 'suggestion',
      userPermissions: ['ADMINISTRATOR'],
      description: 'Updates the status of a suggestion',
      argsType: 'multiple',
    })
  }

  run = async (message, args) => {
    const { guild } = message

    const messageId = args.shift()
    const status = args.shift().toUpperCase()
    const reason = args.join(' ')

    message.delete()

    const newStatus = statusMessages[status]

    if (!newStatus) {
      message.reply(
        `Unknown status "${status}", please use ${Object.keys(statusMessages)}`
      )
      return
    }

    const channelId = suggestionCache()[guild.id]
    if (!channelId) {
      message.reply('An error occurred, please report this')
      return
    }

    const channel = guild.channels.cache.get(channelId)
    if (!channel) {
      message.reply('The suggestion channel no longer exists')
      return
    }

    const targetMessage = await channel.messages.fetch(messageId, false, true)
    if (!targetMessage) {
      message.reply('That message no longer exists')
      return
    }

    const oldEmbed = targetMessage.embeds[0]

    const embed = new MessageEmbed()
      .setAuthor(oldEmbed.author.name, oldEmbed.author.iconURL)
      .setDescription(oldEmbed.description)
      .setColor(newStatus.color)
      .setFooter('Want to suggest something? Simply type it in this channel')

    if (oldEmbed.fields.length === 2) {
      embed.addFields(oldEmbed.fields[0], {
        name: 'Status',
        value: `${newStatus.text}${reason ? ` Reason: ${reason}` : ''}`,
      })
    } else {
      embed.addFields({
        name: 'Status',
        value: `${newStatus.text}${reason ? ` Reason: ${reason}` : ''}`,
      })
    }

    targetMessage.edit(embed)
  }
}
