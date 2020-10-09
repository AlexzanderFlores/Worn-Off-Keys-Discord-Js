const Commando = require('discord.js-commando')
const dailyRewardsSchema = require('@schemas/daily-rewards-schema')

// Array of member IDs who have claimed their daily rewards in the last 24 hours
// Resets every 10 minutes
let claimedCache = []

const clearCache = () => {
  claimedCache = []
  setTimeout(clearCache, 1000 * 60 * 10) // 10 minutes
}
clearCache()

const alreadyClaimed = 'You have already claimed your daily rewards'

module.exports = class DailyCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'daily',
      group: 'economy',
      memberName: 'daily',
      description: 'Claims daily rewards',
    })
  }

  async run(message) {
    const { guild, member } = message
    const { id } = member

    if (claimedCache.includes(id)) {
      console.log('Returning from cache')
      message.reply(alreadyClaimed)
      return
    }

    console.log('Fetching from mongo')

    const obj = {
      guildId: guild.id,
      userId: id,
    }

    const results = await dailyRewardsSchema.findOne(obj)

    console.log('RESULTS:', results)

    if (results) {
      const then = new Date(results.updatedAt).getTime()
      const now = new Date().getTime()

      const diffTime = Math.abs(now - then)
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays <= 1) {
        claimedCache.push(id)

        message.reply(alreadyClaimed)
        return
      }
    }

    await dailyRewardsSchema.findOneAndUpdate(obj, obj, {
      upsert: true,
    })

    claimedCache.push(id)

    // TODO: Give the rewards
    message.reply('You have claimed your daily rewards!')
  }
}
