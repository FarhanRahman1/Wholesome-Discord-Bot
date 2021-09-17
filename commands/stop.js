exports.run=async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.reply({embeds:[await client.embeds.custom('There is nothing in the queue right now!')]})
    await client.distube.stop(message)
    message.react('✅')
}
exports.aliases=[]