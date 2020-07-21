const command = require('./command')
const ownerId = '251120969320497152' // my discord user ID
const channelId = '731801004462571602' // private channel ID

module.exports = (client) => {
  command(client, 'eval', (message) => {
    const { member, channel, content } = message

    if (member.id === ownerId && channel.id === channelId) {
      const result = eval(content.replace('!eval ', ''))
      channel.send(result)
    }
  })
}
