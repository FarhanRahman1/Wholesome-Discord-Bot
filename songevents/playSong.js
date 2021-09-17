module.exports = async (client, queue, song) => {
    const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
    queue.textChannel.send({embeds:[await client.embeds.songPlay(song,status,queue)]})
    if (queue.autoplay && queue.songs.length == 1) queue.addRelatedSong().catch(e => { console.log(e); })
    client.user.setActivity(`🎵${song.name} in ${queue.voiceChannel.name}🎵`, { type: "PLAYING" })
}