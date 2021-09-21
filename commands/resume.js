exports.run=async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.reply({embeds:[await client.embeds.custom('There is nothing in the queue right now!')]})
    if(!queue.paused) return message.reply({embeds:[await client.custom("It's already playing")]})
    client.distube.resume(message)
    message.react('▶️').catch(console.error)
}
exports.aliases=[]
exports.isSong=true