const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const loadCommands = require('./commands/load-commands')
const commandBase = require('./commands/command-base')
const levels = require('./levels')

client.on('ready', async () => {
  console.log('The client is ready!')

  commandBase.loadPrefixes(client)
  loadCommands(client)
  levels(client)
})

client.login(config.token)
