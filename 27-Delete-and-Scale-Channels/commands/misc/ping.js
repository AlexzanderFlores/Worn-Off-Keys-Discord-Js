module.exports = {
  commands: 'ping',
  minArgs: 0,
  maxArgs: 0,
  callback: (message, arguments, text) => {
    message.reply('Pong!')
  },
}
