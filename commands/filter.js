exports.run=async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.reply('There is nothing in the queue right now!')
    if (args[0] === "off" && queue.filters.length>0) client.distube.setFilter(message, false)
    else if (Object.keys(client.distube.filters).includes(args[0])) client.distube.setFilter(message, args[0])
    else if (args[0]) return message.reply('Not a valid filter')
    message.reply(`Current Queue Filter: \`${queue.filters.length>0? queue.filters.join(" ") : "Off"}\``)
}
exports.aliases=['f']