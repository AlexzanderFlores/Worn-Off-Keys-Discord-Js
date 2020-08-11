require('module-alias/register')

// const Discord = require('discord.js')
// const client = new Discord.Client()

const path = require('path')
const Commando = require('discord.js-commando')

const config = require('@root/config.json')
const { loadLanguages } = require('@util/language')
const loadCommands = require('@root/commands/load-commands')
const commandBase = require('@root/commands/command-base')
const loadFeatures = require('@root/features/load-features')

const modLogs = require('@features/mod-logs')

const client = new Commando.CommandoClient({
  owner: '251120969320497152',
  commandPrefix: config.prefix,
})

client.on('ready', async () => {
  console.log('The client is ready!')

  client.registry
    .registerGroups([
      ['misc', 'misc commands'],
      ['moderation', 'moderation commands'],
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'cmds'))

  loadLanguages(client)
  // commandBase.loadPrefixes(client)
  // loadCommands(client)
  // loadFeatures(client)

  modLogs(client)
})

client.login(config.token)
