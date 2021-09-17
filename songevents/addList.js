module.exports=async (client,queue,playlist)=>{
    queue.textChannel.send({embeds:[await client.embeds.listAdd(playlist)]})
}