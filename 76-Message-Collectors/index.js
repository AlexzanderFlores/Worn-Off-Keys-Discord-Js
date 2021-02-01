const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
require('dotenv').config()

const client = new DiscordJS.Client()

client.on('ready', () => {
  console.log('Ready')

  new WOKCommands(client)
})

client.login(process.env.TOKEN)
