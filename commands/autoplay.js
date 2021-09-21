exports.run = async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.reply({embeds:[await client.embeds.custom("Queue is empty.")]})
    if(queue.songs.length==1 && !queue.autoplay)queue.addRelatedSong()
    let mode = queue.toggleAutoplay()
    message.reply({embeds:[await client.embeds.autoplayMode(mode)]})
}
exports.aliases=['ap']
exports.isSong=true