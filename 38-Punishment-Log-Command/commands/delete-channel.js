module.exports = {
  commands: ['deletechannel', 'delchannel'],
  maxArgs: 0,
  permissionError: 'You must be an admin to use this command.',
  permissions: 'ADMINISTRATOR',
  description: 'Deletes the current channel.',
  callback: (message, arguments, text) => {
    message.channel.delete()
  },
}
