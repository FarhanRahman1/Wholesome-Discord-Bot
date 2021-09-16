exports.run=async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.reply('There is nothing in the queue right now!')
    if (queue.paused) return message.reply("It's already paused")
    await client.distube.pause(message)
    message.react('⏸️').catch(console.error)
}