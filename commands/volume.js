exports.run=async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.reply({embeds:[await client.embeds.custom('There is nothing in the queue right now!')]})
    const volume = parseInt(args[0])
    if (isNaN(volume) || volume<0) return message.reply({embeds:[await client.embeds.custom('Please enter a valid number!')]})
    client.distube.setVolume(message, volume)
    message.reply({embeds:[await client.embeds.vol(volume)]})
}
exports.aliases=['v']