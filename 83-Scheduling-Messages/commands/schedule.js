const momentTimezone = require('moment-timezone')
const { MessageCollector } = require('discord.js')

const scheduledSchema = require('../models/scheduled-schema')

module.exports = {
  requiredPermissions: ['ADMINISTRATOR'],
  expectedArgs: '<Channel tag> <YYYY/MM/DD> <HH:MM> <"AM" or "PM"> <Timezone>',
  minArgs: 5,
  maxArgs: 5,
  init: (client) => {
    const checkForPosts = async () => {
      const query = {
        date: {
          $lte: Date.now(),
        },
      }

      const results = await scheduledSchema.find(query)

      for (const post of results) {
        const { guildId, channelId, content } = post

        const guild = await client.guilds.fetch(guildId)
        if (!guild) {
          continue
        }

        const channel = guild.channels.cache.get(channelId)
        if (!channel) {
          continue
        }

        channel.send(content)
      }

      await scheduledSchema.deleteMany(query)

      setTimeout(checkForPosts, 1000 * 10)
    }

    checkForPosts()
  },
  callback: async ({ message, args }) => {
    const { mentions, guild, channel } = message

    const targetChannel = mentions.channels.first()
    if (!targetChannel) {
      message.reply('Please tag a channel to send your message in.')
      return
    }

    // Remve the channel tag from the args array
    args.shift()

    const [date, time, clockType, timeZone] = args

    if (clockType !== 'AM' && clockType !== 'PM') {
      message.reply(
        `You must provide either "AM" or "PM", you provided "${clockType}"`
      )
      return
    }

    const validTimeZones = momentTimezone.tz.names()
    if (!validTimeZones.includes(timeZone)) {
      message.reply(
        'Unknown timezone! Please use one of the following: <https://gist.github.com/AlexzanderFlores/d511a7c7e97b4c3ae60cb6e562f78300>'
      )
      return
    }

    const targetDate = momentTimezone.tz(
      `${date} ${time} ${clockType}`,
      'YYYY-MM-DD HH:mm A',
      timeZone
    )

    message.reply('Please send the message you would like to schedule.')

    const filter = (newMessage) => {
      return newMessage.author.id === message.author.id
    }

    const collector = new MessageCollector(channel, filter, {
      max: 1,
      time: 1000 * 60, // 60 seconds
    })

    collector.on('end', async (collected) => {
      const collectedMessage = collected.first()

      if (!collectedMessage) {
        message.reply('You did not reply in time.')
        return
      }

      message.reply('Your message has been scheduled.')

      await new scheduledSchema({
        date: targetDate.valueOf(),
        content: collectedMessage.content,
        guildId: guild.id,
        channelId: targetChannel.id,
      }).save()
    })
  },
}
