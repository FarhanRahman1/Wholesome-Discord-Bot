exports.run=async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.reply('There is nothing in the queue right now!')
    if(!queue.playing) return message.reply("Nothing playing right now")
    const time = parseInt(args[0])
    if (isNaN(time) || time<0) return message.reply('Please enter a valid number!')
    await client.distube.seek(message, time);
    message.react('✅').catch(console.error)
}