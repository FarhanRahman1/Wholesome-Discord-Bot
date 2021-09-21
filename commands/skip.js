exports.run=async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.reply({embeds:[await client.embeds.custom("Queue is empty.")]})
    try {
        client.distube.skip(message)
        message.react('✅')
    } catch (e) {
        console.log(e);
    }
}
exports.aliases=['next']
exports.isSong=true