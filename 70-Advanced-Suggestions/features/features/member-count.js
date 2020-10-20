module.exports = (client) => {
  const channelId = '732883157103149067'

  const updateMembers = (guild) => {
    if (guild) {
      const channel = guild.channels.cache.get(channelId)
      if (channel) {
        channel.setName(`Members: ${guild.memberCount.toLocaleString()}`)
      }
    }
  }

  client.on('guildMemberAdd', (member) => updateMembers(member.guild))
  client.on('guildMemberRemove', (member) => updateMembers(member.guild))

  const guild = client.guilds.cache.get('464316540490088448')
  updateMembers(guild)
}
