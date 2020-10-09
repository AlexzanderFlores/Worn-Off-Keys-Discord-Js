const Commando = require('discord.js-commando')
const muteSchema = require('@schemas/mute-schema')

const reasons = {
  SPAMMING: 5,
  ADVERTISING: 24,
}

module.exports = class MuteCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: '_mute',
      group: 'moderation',
      memberName: '_mute',
      userPermissions: ['ADMINISTRATOR'],
      description: 'Mutes a user',
      argsType: 'multiple',
    })
  }

  run = async (message, args) => {
    // !mute @ reason

    const { guild, author: staff } = message

    if (args.length !== 2) {
      message.reply(
        `Correct syntax: ${guild.commandPrefix}mute <Target @> <Reason>`
      )
      return
    }

    const target = message.mentions.users.first()
    if (!target) {
      message.reply('Please specify someone to mute')
      return
    }

    const reason = args[1].toUpperCase()
    if (!reasons[reason]) {
      let validReasons = ''
      for (const key in reasons) {
        validReasons += `${key}, `
      }
      validReasons = validReasons.substr(0, validReasons.length - 2)

      message.reply(
        `Unknown reason, please use one of the following: ${validReasons}`
      )
      return
    }

    const previousMutes = await muteSchema.find({
      userId: target.id,
    })

    const currentlyMuted = previousMutes.filter((mute) => {
      return mute.current === true
    })

    if (currentlyMuted.length) {
      message.reply('That user is already muted')
      return
    }

    let duration = reasons[reason] * (previousMutes.length + 1)

    const expires = new Date()
    expires.setHours(expires.getHours() + duration)

    const mutedRole = guild.roles.cache.find((role) => {
      return role.name === 'Muted'
    })
    if (!mutedRole) {
      message.reply('Could not find a "Muted" role')
      return
    }

    const targetMember = (await guild.members.fetch()).get(target.id)
    targetMember.roles.add(mutedRole)

    await new muteSchema({
      userId: target.id,
      guildId: guild.id,
      reason,
      staffId: staff.id,
      staffTag: staff.tag,
      expires,
      current: true,
    }).save()

    message.reply(
      `You muted <@${target.id}> for "${reason}". They will be unmuted in ${duration} hours.`
    )
  }
}
