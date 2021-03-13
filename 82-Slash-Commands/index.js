const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
require('dotenv').config()

const guildId = '817730053403312128'
const client = new DiscordJS.Client()

client.on('ready', () => {
  new WOKCommands(client, {
    commandsDir: 'commands',
    testServers: [guildId],
    showWarns: false,
  })
})

// const getApp = (guildId) => {
//   const app = client.api.applications(client.user.id)
//   if (guildId) {
//     app.guilds(guildId)
//   }
//   return app
// }

// client.on('ready', async () => {
//   console.log('The bot is ready')

//   const commands = await getApp(guildId).commands.get()
//   console.log(commands)

//   await getApp(guildId).commands.post({
//     data: {
//       name: 'ping',
//       description: 'A simple ping pong command',
//     },
//   })

//   // await getApp(guildId).commands('817740792533090314').delete()

//   // await getApp(guildId).commands.post({
//   //   data: {
//   //     name: 'embed',
//   //     description: 'Displays an embed',
//   //     options: [
//   //       {
//   //         name: 'Name',
//   //         description: 'Your name',
//   //         required: true,
//   //         type: 3, // string
//   //       },
//   //       {
//   //         name: 'Age',
//   //         description: 'Your age',
//   //         required: false,
//   //         type: 4, // integer
//   //       },
//   //     ],
//   //   },
//   // })

//   client.ws.on('INTERACTION_CREATE', async (interaction) => {
//     const { name, options } = interaction.data

//     const command = name.toLowerCase()

//     const args = {}

//     console.log(options)

//     if (options) {
//       for (const option of options) {
//         const { name, value } = option
//         args[name] = value
//       }
//     }

//     console.log(args)

//     if (command === 'ping') {
//       reply(interaction, 'pong')
//     } else if (command === 'embed') {
//       const embed = new DiscordJS.MessageEmbed().setTitle('Example Embed')

//       for (const arg in args) {
//         const value = args[arg]
//         embed.addField(arg, value)
//       }

//       reply(interaction, embed)
//     }
//   })
// })

// const reply = async (interaction, response) => {
//   let data = {
//     content: response,
//   }

//   // Check for embeds
//   if (typeof response === 'object') {
//     data = await createAPIMessage(interaction, response)
//   }

//   client.api.interactions(interaction.id, interaction.token).callback.post({
//     data: {
//       type: 4,
//       data,
//     },
//   })
// }

// const createAPIMessage = async (interaction, content) => {
//   const { data, files } = await DiscordJS.APIMessage.create(
//     client.channels.resolve(interaction.channel_id),
//     content
//   )
//     .resolveData()
//     .resolveFiles()

//   return { ...data, files }
// }

client.login(process.env.TOKEN)
