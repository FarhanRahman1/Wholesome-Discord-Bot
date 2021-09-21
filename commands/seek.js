exports.run=async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.reply({embeds:[await client.embeds.custom('There is nothing in the queue right now!')]})
    if(!queue.playing) return message.reply({embeds:[await client.embeds.custom("Nothing playing right now")]})
    const time = parseInt(args[0])
    if (isNaN(time) || time<0) return message.reply({embeds:[await client.embeds.custom('Please enter a valid number!')]})
    await client.distube.seek(message, time);
    message.react('✅').catch(console.error)
}
exports.aliases=[]
exports.isSong=true