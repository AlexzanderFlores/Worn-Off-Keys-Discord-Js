const Commando = require('discord.js-commando')

module.exports = class SlowCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'slow',
      group: 'misc',
      memberName: 'slow',
      userPermissions: ['ADMINISTRATOR'],
      description: 'Changes the slowmode duration for this channel',
      argsType: 'multiple',
    })
  }

  run = (message, args) => {
    const { channel } = message

    if (args.length < 2) {
      message.reply('Please provide a duration and a reason')
      return
    }

    let duration = args.shift().toLowerCase()
    if (duration === 'off') {
      duration = 0
    }

    if (isNaN(duration)) {
      message.reply(
        'Please provide either a number of seconds or the word "off"'
      )
      return
    }

    //['testing','hello','world']
    //.join(' ')
    //testing hello world

    channel.setRateLimitPerUser(duration, args.join(' '))
    message.reply(`The slowmode for this channel has been set to ${duration}`)
  }
}
