const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const loadCommands = require('./commands/load-commands')
const levels = require('./levels')

client.on('ready', async () => {
  console.log('The client is ready!')

  loadCommands(client)
  levels(client)
})

client.login(config.token)
