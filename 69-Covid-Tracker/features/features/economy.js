const profileSchema = require('@schemas/profile-schema')

const coinsCache = {} // { 'guildId-userId': coins }

module.exports = (client) => {}

module.exports.addCoins = async (guildId, userId, coins) => {
  console.log('Running findOneAndUpdate()')

  const result = await profileSchema.findOneAndUpdate(
    {
      guildId,
      userId,
    },
    {
      guildId,
      userId,
      $inc: {
        coins,
      },
    },
    {
      upsert: true,
      new: true,
    }
  )

  coinsCache[`${guildId}-${userId}`] = result.coins

  return result.coins
}

module.exports.getCoins = async (guildId, userId) => {
  const cachedValue = coinsCache[`${guildId}-${userId}`]
  if (cachedValue) {
    return cachedValue
  }

  console.log('Running findOne()')

  const result = await profileSchema.findOne({
    guildId,
    userId,
  })

  let coins = 0
  if (result) {
    coins = result.coins
  } else {
    console.log('Inserting a document')
    await new profileSchema({
      guildId,
      userId,
      coins,
    }).save()
  }

  coinsCache[`${guildId}-${userId}`] = coins

  return coins
}
