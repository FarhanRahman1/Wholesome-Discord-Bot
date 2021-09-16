exports.run=async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.reply('There is nothing in the queue right now!')
    const volume = parseInt(args[0])
    if (isNaN(volume) || volume<0) return message.reply('Please enter a valid number!')
    client.distube.setVolume(message, volume)
    message.reply(`Volume set to \`${volume}\``)
}
exports.aliases=['v']