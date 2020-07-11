const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const roleClaim = require('./role-claim')

client.on('ready', () => {
  console.log('The client is ready!')

  roleClaim(client)
})

client.login(config.token)
