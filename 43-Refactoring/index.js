require('module-alias/register')

const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('@root/config.json')
const { loadLanguages } = require('@util/language')
const loadCommands = require('@root/commands/load-commands')
const commandBase = require('@root/commands/command-base')
const loadFeatures = require('@root/features/load-features')

const modLogs = require('@features/mod-logs')

client.on('ready', async () => {
  console.log('The client is ready!')

  loadLanguages(client)
  commandBase.loadPrefixes(client)
  loadCommands(client)
  loadFeatures(client)

  modLogs(client)
})

client.login(config.token)
