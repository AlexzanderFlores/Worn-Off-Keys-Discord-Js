const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const command = require('./command')

client.on('ready', () => {
  console.log('The client is ready!')

  command(client, 'help', (message) => {
    message.channel.send(`
These are my supported commands:

**!help** - Displays the help menu
**!add <num1> <num2>** - Adds two numbers
**!sub <num1> <num2>** - Subtracts two numbers
`)
  })

  const { prefix } = config

  client.user.setPresence({
    activity: {
      name: `"${prefix}help" for help`,
    },
  })
})

client.login(config.token)
