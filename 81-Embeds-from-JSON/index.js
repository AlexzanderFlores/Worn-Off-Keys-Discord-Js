const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
require('dotenv').config()

const client = new DiscordJS.Client()

client.on('ready', () => {
  new WOKCommands(client, {
    commandsDir: 'commands',
    showWarns: false,
  })

  console.log('The bot is ready')
})

client.login(process.env.TOKEN)
