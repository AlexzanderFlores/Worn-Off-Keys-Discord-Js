const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const sendMessage = require('./send-message')

client.on('ready', () => {
  console.log('The client is ready!')

  const guild = client.guilds.cache.get('464316540490088448')
  const channel = guild.channels.cache.get('731801004462571602')

  sendMessage(channel, 'hello world', 3)
})

client.login(config.token)
