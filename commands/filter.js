exports.run=async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.reply({embeds:[await client.embeds.custom("There's nothing playing right now")]})
    if (args[0] === "off" && queue.filters.length>0) client.distube.setFilter(message, false)
    else if (Object.keys(client.distube.filters).includes(args[0])) client.distube.setFilter(message, args[0])
    else if (args[0]) return message.reply({embeds:[await client.embeds.custom("Not a valid filter. Available filters are:\n3d/vaporwave/bassboost/echo/nightcore/karaoke/flanger/gate/haas/reverse/surround/mcompand/phaser/tremolo/earwax/off")]})
    message.reply({embeds:[await client.embeds.newFilter(queue)]})
}
exports.aliases=['f']
exports.isSong=true