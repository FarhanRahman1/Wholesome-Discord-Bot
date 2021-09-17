exports.run=async (client, message, args) => {
    const queue = await client.distube.getQueue(message)
    if (!queue) return message.reply({embeds:[await client.embeds.custom("Queue is empty.")]})
    message.reply({embeds:[await client.embeds.newQueue(queue)]})
}
exports.aliases=['q']