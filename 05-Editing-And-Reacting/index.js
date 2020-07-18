const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const firstMessage = require('./first-message')

client.on('ready', () => {
  console.log('The client is ready!')

  firstMessage(client, '723819742502191165', 'hello world!!!', ['🔥', '🍉'])
})

client.login(config.token)
