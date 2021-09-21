exports.run=async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if(!queue) return message.reply({embeds:[await client.embeds.custom("There's nothing playing right now")]})
    const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
    message.reply({embeds:[await client.embeds.np(queue,status)]})
}
exports.aliases=['np']
exports.isSong=true