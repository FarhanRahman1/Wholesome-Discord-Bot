exports.run=async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.reply('There is nothing playing!')
    const q = queue.songs.slice(0,10).map((song, i) => `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join("\n")
    message.reply(`**Server Queue**\n${q}`)
}
exports.aliases=['q']