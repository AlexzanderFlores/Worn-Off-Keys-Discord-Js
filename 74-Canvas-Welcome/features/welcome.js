const Canvas = require('canvas')
const { MessageAttachment } = require('discord.js')
const path = require('path')
const { getChannelId } = require('../commands/setwelcome')

module.exports = (client) => {
  client.on('guildMemberAdd', async (member) => {
    const { guild } = member

    const channelId = getChannelId(guild.id)
    if (!channelId) {
      return
    }

    const channel = guild.channels.cache.get(channelId)
    if (!channel) {
      return
    }

    const canvas = Canvas.createCanvas(700, 250)
    const ctx = canvas.getContext('2d')

    const background = await Canvas.loadImage(
      path.join(__dirname, '../background.png')
    )
    let x = 0
    let y = 0
    ctx.drawImage(background, x, y)

    const pfp = await Canvas.loadImage(
      member.user.displayAvatarURL({
        format: 'png',
      })
    )
    x = canvas.width / 2 - pfp.width / 2
    y = 25
    ctx.drawImage(pfp, x, y)

    ctx.fillStyle = '#ffffff'
    ctx.font = '35px sans-serif'
    let text = `Welcome ${member.user.tag}`
    x = canvas.width / 2 - ctx.measureText(text).width / 2
    ctx.fillText(text, x, 60 + pfp.height)

    ctx.font = '30px sans-serif'
    text = `Member #${guild.memberCount}`
    x = canvas.width / 2 - ctx.measureText(text).width / 2
    ctx.fillText(text, x, 100 + pfp.height)

    const attachment = new MessageAttachment(canvas.toBuffer())
    channel.send('', attachment)
  })
}
