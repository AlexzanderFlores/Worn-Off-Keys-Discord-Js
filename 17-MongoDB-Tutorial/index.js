const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const mongo = require('./mongo')

client.on('ready', async () => {
  console.log('The client is ready!')

  await mongo().then((mongoose) => {
    try {
      console.log('Connected to mongo!')
    } finally {
      mongoose.connection.close()
    }
  })
})

client.login(config.token)
