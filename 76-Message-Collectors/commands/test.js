const DiscordJS = require('discord.js')

module.exports = {
  callback: (message) => {
    const questions = [
      'What is your name?',
      'How old are you?',
      'What country are you from?',
    ]
    let counter = 0

    const filter = (m) => {
      return m.author.id === message.author.id
    }

    const collector = new DiscordJS.MessageCollector(message.channel, filter, {
      max: questions.length,
      time: 1000 * 3, // 15s
    })

    message.channel.send(questions[counter++])
    collector.on('collect', (m) => {
      if (counter < questions.length) {
        m.channel.send(questions[counter++])
      }
    })

    collector.on('end', (collected) => {
      console.log(`Collected ${collected.size} messages`)

      if (collected.size < questions.length) {
        message.reply('You did not answer the questions in time')
        return
      }

      let counter = 0
      collected.forEach((value) => {
        console.log(questions[counter++], value.content)
      })
    })
  },
}
