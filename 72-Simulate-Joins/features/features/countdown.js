const seconds = 5
const startingCounter = 60
let counter = startingCounter
let importantData = ''

const fetchData = async () => {
  importantData = 'hello world'
}

const getText = () => {
  return `${importantData}\n\nUpdating in ${counter}s...`
}

const updateCounter = async (message) => {
  message.edit(getText())
  counter -= seconds

  if (counter <= 0) {
    counter = startingCounter
    await fetchData()
  }

  setTimeout(() => {
    updateCounter(message)
  }, 1000 * seconds)
}

module.exports = async (client) => {
  return
  await fetchData()

  const guild = client.guilds.cache.first()
  const channel = guild.channels.cache.get('768826354761990154')

  const message = await channel.send(getText())

  updateCounter(message)
}
