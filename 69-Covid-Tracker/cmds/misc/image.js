const fs = require('fs')
const path = require('path')
const { MessageAttachment } = require('discord.js')
const Commando = require('discord.js-commando')

module.exports = class ImageCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'image',
      group: 'misc',
      memberName: 'image',
      description: 'Sends an image',
    })
  }

  run = (message) => {
    const image = fs.readFileSync(path.join(__dirname, 'image.jpg'))

    const attachment = new MessageAttachment(image)

    message.reply('Here is an image', attachment)
  }
}
