exports.run = async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.reply('There is nothing in the queue right now!')
    if(queue.songs.length==1 && !queue.autoplay)queue.addRelatedSong()
    let mode = queue.toggleAutoplay()
    message.reply("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
}
exports.aliases=['ap']