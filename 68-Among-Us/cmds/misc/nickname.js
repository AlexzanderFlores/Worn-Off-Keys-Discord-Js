const Commando = require('discord.js-commando')

module.exports = class NicknameCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'nick',
      group: 'misc',
      memberName: 'nick',
      userPermissions: ['MANAGE_NICKNAMES', 'CHANGE_NICKNAME'],
      clientPermissions: ['MANAGE_NICKNAMES', 'CHANGE_NICKNAME'],
      description: 'Changes the nickname of a user',
      argsType: 'multiple',
    })
  }

  run = (message, args) => {
    const target = message.mentions.users.first()
    const member = message.guild.members.cache.get(target.id)

    args.shift()
    const nickname = args.join(' ')

    member.setNickname(nickname)

    message.reply('You changed the nickname!')
  }
}
