const path = require('path')
const fs = require('fs')

module.exports = (client) => {
  const baseFile = 'command-base.js'
  const commandBase = require(`./${baseFile}`)

  const commands = []

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file))
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file))
      } else if (file !== baseFile && file !== 'load-commands.js') {
        const option = require(path.join(__dirname, dir, file))
        commands.push(option)
        if (client) {
          commandBase(client, option)
        }
      }
    }
  }

  readCommands('.')

  return commands
}
