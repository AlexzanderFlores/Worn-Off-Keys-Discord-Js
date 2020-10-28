module.exports = (client) => {
  client.on('guildMemberAdd', (member) => {
    console.log(`${member.id} has joined the server`)
  })

  client.on('guildMemberLeave', (member) => {
    console.log(`${member.id} has left the server`)
  })
}
