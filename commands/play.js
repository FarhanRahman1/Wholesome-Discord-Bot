exports.run=async (client, message, args) => {
    if(message.member.voice.channelId==null) return message.reply("You are not connected to any voice channel.")
    const queue = client.distube.getQueue(message)
    if(queue){
        if (queue.paused){
            client.distube.resume(message)
            return message.react('▶️').catch(console.error)
        }
    }
    const song = args.join(" ")
    if (!song) return message.reply('Please enter a song name or url to play')
    try {
        client.distube.play(message, song)
    } catch (e) {console.log(e);}
}
exports.aliases=['p']