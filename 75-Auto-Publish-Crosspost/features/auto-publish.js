module.exports = (client) => {
  client.on('message', (message) => {
    const { channel } = message

    if (channel.type === 'news') {
      message.crosspost()
      console.log('published news message')
    }
  })
}
