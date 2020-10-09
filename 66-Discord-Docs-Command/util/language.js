const mongo = require('@util/mongo')
const languageSchema = require('@schemas/language-schema')
const lang = require('@root/lang.json')

// { 'guildId': 'language' }
const guildLanguages = {}

const loadLanguages = async (client) => {
  for (const guild of client.guilds.cache) {
    const guildId = guild[0]

    const result = await languageSchema.findOne({
      _id: guildId,
    })

    guildLanguages[guildId] = result ? result.language : 'english'
  }
}

const setLanguage = (guild, language) => {
  guildLanguages[guild.id] = language.toLowerCase()
}

module.exports = (guild, textId) => {
  if (!lang.translations[textId]) {
    throw new Error(`Unknown text ID "${textId}"`)
  }

  const selectedLanguage = guildLanguages[guild.id].toLowerCase()

  return lang.translations[textId][selectedLanguage]
}

module.exports.loadLanguages = loadLanguages
module.exports.setLanguage = setLanguage
