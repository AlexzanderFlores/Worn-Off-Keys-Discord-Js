const language = require('@util/language')

module.exports = {
  commands: ['add', 'addition'],
  expectedArgs: '<num1> <num2>',
  permissionError: 'You need admin permissions to run this command',
  minArgs: 2,
  maxArgs: 2,
  cooldown: 10,
  description: 'Add two numbers',
  callback: (message, arguments, text) => {
    const { guild } = message

    const num1 = +arguments[0]
    const num2 = +arguments[1]

    message.reply(`${language(guild, 'THE_SUM_IS')} ${num1 + num2}`)
  },
  permissions: 'ADMINISTRATOR',
  requiredRoles: [],
}
