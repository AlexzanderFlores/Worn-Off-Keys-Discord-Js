const Commando = require('discord.js-commando')

module.exports = class KickCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'kick',
      group: 'moderation',
      memberName: 'kick',
      description: 'Kicks a member from the discord server',
      clientPermissions: ['KICK_MEMBERS'],
      userPermissions: ['KICK_MEMBERS'],
    })
  }

  async run(message) {
    const target = message.mentions.users.first()
    if (!target) {
      message.reply('Please specify someone to kick')
      return
    }

    const { guild } = message

    const member = guild.members.cache.get(target.id)
    if (member.kickable) {
      member.kick()
      message.reply('That user has been kicked')
    } else {
      message.reply('I cannot kick that user')
    }
  }
}
