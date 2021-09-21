exports.run=async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if(queue){
        if (queue.paused){
            client.distube.resume(message)
            return message.react('▶️').catch(console.error)
        }
    }
    const song = args.join(" ")
    if (!song) return message.reply({embeds:[await client.embeds.custom('Please enter a song name or link to play')]})
    try {
        client.distube.play(message, song)
    } catch (e) {console.log(e);}
}
exports.aliases=['p']
exports.isSong=true