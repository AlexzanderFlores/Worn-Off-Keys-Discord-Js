const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
require('dotenv').config()

const client = new DiscordJS.Client()

client.on('ready', () => {
  console.log('The bot is ready')

  new WOKCommands(client, 'commands', 'features')
})

client.login(process.env.TOKEN)
