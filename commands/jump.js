exports.run=async(client,message,args)=>{
    const queue = await client.distube.getQueue(message)
    if (!queue) return message.reply({ embeds: [await client.embeds.custom("Queue is empty.")] })
    const index = parseInt(args[0])
    if (isNaN(index) || index>=queue.songs.length) return message.reply({embeds:[await client.embeds.custom('Please enter a valid number!')]})
    queue.jump(index).then(q=>message.react("✅")).catch(e=>console.log(e))
}
exports.aliases=['j']
exports.isSong=true