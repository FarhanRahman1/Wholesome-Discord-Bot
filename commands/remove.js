exports.run=async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.reply('There is nothing playing!')
    const index = parseInt(args[0])
    if (isNaN(index) || index<1 || index>=queue.songs.length) return message.reply('Please enter a valid number!')
    await queue.songs.splice(index,1)
    message.react('✅').catch(console.error)
}
exports.aliases=['qr']