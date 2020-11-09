module.exports = {
  requiredPermissions: ['ADMINISTRATOR'],
  callback: (message, args, text, client) => {
    client.emit('guildMemberAdd', message.member)
  },
}
