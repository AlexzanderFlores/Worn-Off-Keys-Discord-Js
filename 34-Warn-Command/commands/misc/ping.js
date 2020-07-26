module.exports = {
  commands: 'ping',
  minArgs: 0,
  maxArgs: 0,
  description: 'Replies with pong',
  callback: (message, arguments, text) => {
    message.reply('Pong!')
  },
}
