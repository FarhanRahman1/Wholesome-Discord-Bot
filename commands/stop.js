exports.run=async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.reply('There is nothing in the queue right now!')
    await client.distube.stop(message)
    message.react('✅')
}