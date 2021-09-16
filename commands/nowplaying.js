exports.run=async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if(!queue) return message.reply('There is nothing playing!')
    const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
    message.reply(`Playing \`${queue.songs[0].name}\` - \`${queue.songs[0].formattedDuration}\`\n${status(queue)}`)
}
exports.aliases=['np']