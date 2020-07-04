const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const privateMessage = require('./private-message')

client.on('ready', () => {
  console.log('The client is ready!')

  privateMessage(client, 'ping', 'Pong!')

  client.users.fetch('251120969320497152').then((user) => {
    user.send('Hello World!')
  })
})

client.login(config.token)
