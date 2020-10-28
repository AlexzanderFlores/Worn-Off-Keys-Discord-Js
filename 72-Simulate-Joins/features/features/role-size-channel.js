const roleSizeSchema = require('@schemas/role-size-schema')

// { `${guildId}-${roleId}`: [channelId, text] }
// { `${guildId}-all`: [channelId, text] }
let channelData = {}

const fetchChannelData = async () => {
  const results = await roleSizeSchema.find({})

  channelData = {}

  for (const result of results) {
    const { guildId, channelId, roleId, text } = result

    const key = `${guildId}-${roleId}`
    channelData[key] = [channelId, text]
  }

  console.log('CHANNEL DATA:')
  console.log(channelData)

  setTimeout(fetchChannelData, 1000 * 60)
}

module.exports = (client) => {
  fetchChannelData()

  const updateCount = (guild, roleId = 'all') => {
    const key = `${guild.id}-${roleId}`
    console.log('KEY:', key)
    const data = channelData[key]
    if (data) {
      const [channelId, text] = data

      const channel = guild.channels.cache.get(channelId)
      if (channel) {
        let count

        if (roleId === 'all') {
          count = guild.memberCount.toLocaleString()
        } else {
          const role = guild.roles.cache.get(roleId)
          if (role) {
            count = role.members.size
          } else {
            console.log(`Missing role for "${key}": [${channelId}, "${text}"]`)
            return
          }
        }

        channel.setName(`${text} ${count}`)
      } else {
        console.log(`Missing channel for "${key}": [${channelId}, "${text}"]`)
      }
    }
  }

  client.on('guildMemberAdd', (member) => {
    updateCount(member.guild)
  })

  client.on('guildMemberRemove', (member) => {
    updateCount(member.guild)
  })

  client.on('guildMemberUpdate', (oldMember, newMember) => {
    const { roles: beforeRoles } = oldMember
    const { roles: afterRoles, guild } = newMember

    let changedRole

    for (let role of guild.roles.cache) {
      role = role[1]

      const wasInBeforeRoles = !!beforeRoles.cache.get(role.id)
      const isInAfterRoles = !!afterRoles.cache.get(role.id)

      if (wasInBeforeRoles !== isInAfterRoles) {
        changedRole = role
        break
      }
    }

    if (changedRole) {
      updateCount(guild, changedRole.id)
    }
  })
}

module.exports.fetchChannelData = fetchChannelData
