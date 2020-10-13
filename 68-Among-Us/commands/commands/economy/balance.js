const economy = require('@features/economy')

module.exports = {
  commands: ['balance', 'bal'],
  maxArgs: 1,
  expectedArgs: "[Target user's @]",
  description: "Displays a user's coins.",
  callback: async (message) => {
    const target = message.mentions.users.first() || message.author
    const targetId = target.id

    const guildId = message.guild.id
    const userId = target.id

    const coins = await economy.getCoins(guildId, userId)

    message.reply(`That user has ${coins} coins!`)
  },
}
