module.exports = {
  commands: 'invites',
  description: 'Displays who has invited the most members',
  callback: (message) => {
    const { guild } = message

    guild.fetchInvites().then((invites) => {
      const inviteCounter = {
        bob: 19,
        joe: 30,
      }

      invites.forEach((invite) => {
        const { uses, inviter } = invite
        const { username, discriminator } = inviter

        const name = `${username}#${discriminator}`

        inviteCounter[name] = (inviteCounter[name] || 0) + uses
      })

      let replyText = 'Invites:'

      const sortedInvites = Object.keys(inviteCounter).sort(
        (a, b) => inviteCounter[b] - inviteCounter[a]
      )

      console.log(sortedInvites)

      sortedInvites.length = 3

      for (const invite of sortedInvites) {
        const count = inviteCounter[invite]
        replyText += `\n${invite} has invited ${count} member(s)!`
      }

      message.reply(replyText)
    })
  },
}
