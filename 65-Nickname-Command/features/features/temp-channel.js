const tempChannelSchema = require('@schemas/temp-channels-schema')

module.exports = (client) => {
  const checkForExpired = async () => {
    const now = new Date()

    const condition = {
      expires: {
        $lt: now,
      },
    }

    const results = await tempChannelSchema.find(condition)

    if (results) {
      for (const result of results) {
        const { guildId, channelId } = result

        const guild = client.guilds.cache.get(guildId)
        if (guild) {
          const channel = guild.channels.cache.get(channelId)
          if (channel) {
            channel.delete()
          }
        }
      }

      await tempChannelSchema.deleteMany(condition)
    }

    setTimeout(checkForExpired, 1000 * 10)
  }

  checkForExpired()
}
