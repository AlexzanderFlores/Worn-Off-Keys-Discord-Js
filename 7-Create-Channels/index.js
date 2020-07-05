const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const command = require('./command')

client.on('ready', () => {
  console.log('The client is ready!')

  command(client, 'createtextchannel', (message) => {
    const name = message.content.replace('!createtextchannel ', '')

    message.guild.channels
      .create(name, {
        type: 'text',
      })
      .then((channel) => {
        const categoryId = '719799253706342421'
        channel.setParent(categoryId)
      })
  })

  command(client, 'createvoicechannel', (message) => {
    const name = message.content.replace('!createvoicechannel ', '')

    message.guild.channels
      .create(name, {
        type: 'voice',
      })
      .then((channel) => {
        const categoryId = '719799253706342421'
        channel.setParent(categoryId)
        channel.setUserLimit(10)
      })
  })
})

client.login(config.token)
