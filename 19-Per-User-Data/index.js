const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const messageCount = require('./message-counter')

client.on('ready', async () => {
  console.log('The client is ready!')

  messageCount(client)
})

client.login(config.token)
