const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
require('dotenv').config()

const client = new DiscordJS.Client()

client.on('ready', () => {
  new WOKCommands(client, {
    commandsDir: 'commands',
    showWarns: false,
  }).setMongoPath(process.env.MONGO_URI)
})

client.login(process.env.TOKEN)
