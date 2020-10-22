const commandPrefixSchema = require('@schemas/command-prefix-schema')

// Importing command-base so we have access to the
// "updateCache" function which I forgot to cover in the video
const commandBase = require('@root/commands/command-base')

module.exports = {
  commands: 'setprefix',
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: "<This bot's new command prefix>",
  permissionError: 'You must be an admin to run this command.',
  permissions: 'ADMINISTRATOR',
  callback: async (message, arguments, text) => {
    const guildId = message.guild.id
    const prefix = arguments[0]

    await commandPrefixSchema.findOneAndUpdate(
      {
        _id: guildId,
      },
      {
        _id: guildId,
        prefix,
      },
      {
        upsert: true,
      }
    )

    message.reply(`The prefix for this bot is now ${prefix}`)

    // Update the cache
    commandBase.updateCache(guildId, prefix)
  },
}
