const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const memberCount = require('./member-count')

client.on('ready', () => {
  console.log('The client is ready!')

  memberCount(client)
})

client.login(config.token)
