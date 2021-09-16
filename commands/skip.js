exports.run=async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.reply('There is nothing in the queue right now!')
    try {
        client.distube.skip(message)
        message.reply(`Skipped!`)
    } catch (e) {
        console.log(e);
    }
}
exports.aliases=['next']