module.exports = {
  commands: ['deletechannel', 'delchannel'],
  maxArgs: 0,
  permissionError: 'You must be an admin to use this command.',
  permissions: 'ADMINISTRATOR',
  callback: (message, arguments, text) => {
    message.channel.delete()
  },
}
