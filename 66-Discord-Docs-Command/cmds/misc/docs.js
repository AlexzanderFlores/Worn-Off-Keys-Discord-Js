const Commando = require('discord.js-commando')
const axios = require('axios')

module.exports = class DocsCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'docs',
      group: 'misc',
      memberName: 'docs',
      description: 'Displays Discord.JS documentation',
    })
  }

  run = async (message, args) => {
    const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      args
    )}`

    axios
      .get(uri)
      .then((embed) => {
        const { data } = embed

        if (data && !data.error) {
          message.channel.send({ embed: data })
        } else {
          message.reply('Could not find that documentation')
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
