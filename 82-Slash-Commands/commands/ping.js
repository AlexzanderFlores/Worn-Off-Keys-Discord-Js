const { MessageEmbed } = require('discord.js')

module.exports = {
  slash: 'both',
  testOnly: true,
  description: 'A simple ping pong command!!!',
  minArgs: 2,
  expectedArgs: '<Name> <Age> [Country]',
  callback: ({ message, args }) => {
    const embed = new MessageEmbed().setTitle('Example').setDescription('pong')

    const [name, age, country] = args

    embed.addField('Name', name)
    embed.addField('Age', age)
    embed.addField('Country', country || 'None')

    if (message) {
      message.reply('', { embed })
    }

    return embed
  },
}
