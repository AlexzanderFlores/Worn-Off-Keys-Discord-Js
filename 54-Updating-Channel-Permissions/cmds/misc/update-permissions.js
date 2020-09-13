const Commando = require('discord.js-commando')
const permissions = require('@util/permissions')

const name = 'updatepermissions'

// channel = 742559177268002838
// everyone = 464316540490088448

module.exports = class UpdatePermissionsCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name,
      group: 'misc',
      memberName: name,
      description: "Updates a channel's permissions",
      userPermissions: ['ADMINISTRATOR'],
      argsType: 'multiple',
    })
  }

  run = async (message, args) => {
    // !updatepermissions <Channel ID> <Role ID> <"add" or "remove"> <Any amount of permission nodes>

    const { guild } = message

    if (args.length < 4) {
      message.reply(`You must provide a channel ID, role ID, an action, and some number of permission nodes.
      
Syntax example:
${guild.commandPrefix}${name} <Channel ID> <Role ID> <"add" or "remove"> <Any amount of permission nodes>

A list of valid permission nodes can be found here: <https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS>`)

      return
    }

    // Get the channel ID and remove it from the array
    const channelId = args.shift()
    const channel = guild.channels.cache.get(channelId)
    if (!channel) {
      message.reply('Unknown channel')
      return
    }

    // Get the role ID and remove it from the array
    const roleId = args.shift()
    const role = guild.roles.cache.get(roleId)
    if (!role) {
      message.reply('Unknown role')
      return
    }

    // Get the action and make sure it is either "add" or "remove"
    const action = args.shift().toLowerCase()
    if (action !== 'add' && action !== 'remove') {
      message.reply('Please provide either "add" or "remove" as an action')
      return
    }

    // ['test', 'hello']
    // 'test hello'
    // 'TEST HELLO'
    // ['TEST', 'HELLO']

    args = args.join(' ').toUpperCase().split(' ')

    // Check if all permission nodes are valid
    for (const arg of args) {
      if (!permissions.includes(arg)) {
        let allPerms = ''
        for (const perm of permissions) {
          allPerms += `${perm}, `
        }
        allPerms = allPerms.substr(0, allPerms.length - 2)

        const errorMessage = `Unknown permission node "${arg}". Please specify one of the following:
        
${allPerms}`
        message.reply(errorMessage)

        return
      }
    }

    // Update the channel permissions
    channel.overwritePermissions([
      {
        id: roleId,
        allow: action === 'add' ? args : [],
        deny: action === 'remove' ? args : [],
      },
    ])

    message.reply('Channel permissions updated!')
  }
}
