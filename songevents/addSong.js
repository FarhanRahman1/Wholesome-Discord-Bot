module.exports=(client,queue,song)=>{
    queue.textChannel.send({embeds:[await client.embeds.songAdd(song)]})
}