const Commando = require('discord.js-commando')

module.exports = class SimLeaveCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'simleave',
      group: 'testing',
      memberName: 'simleave',
      userPermissions: ['ADMINISTRATOR'],
      description: 'Simulates a leave',
    })
  }

  run = (message) => {
    this.client.emit('guildMemberLeave', message.member)
  }
}
