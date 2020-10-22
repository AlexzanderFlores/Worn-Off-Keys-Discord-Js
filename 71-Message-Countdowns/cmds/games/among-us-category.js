const Commando = require('discord.js-commando')

const amongUsCategorySchema = require('@schemas/among-us-category-schema')

module.exports = class AmongUsCategoryCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'aucat',
      group: 'games',
      memberName: 'aucat',
      userPermissions: ['ADMINISTRATOR'],
      description:
        'Specifies the category to create Among Us voice channels in',
    })
  }

  run = async (message, args) => {
    const categoryId = args
    if (!categoryId) {
      message.reply('Please specify a category ID')
      return
    }

    const guildId = message.guild.id

    await amongUsCategorySchema.findOneAndUpdate(
      {
        _id: guildId,
      },
      {
        _id: guildId,
        categoryId,
      },
      {
        upsert: true,
      }
    )

    message.reply('Among Us category set!')
  }
}
