const db=require('quick.db')
exports.run=async(client,message,args)=>{
    let settings=await db.get(message.guildId)
    if(!message.member.roles.cache.some(role=>settings.adminRoles.includes(role.name))){message.reply("You dont have permissions!");return;};
    sendlist=[]
    await args.forEach(arg=>{
        if(!settings.badwords.includes(arg)){
            db.push(`${message.guildId}.badwords`,arg.toLowerCase())
            sendlist.push(arg)
        }
    })
    message.reply(sendlist.length>0?`${sendlist.join(" ,")} have been added as swear word!`:`It's already added!`).catch(e=>console.log(e))
}
exports.aliases=['ba']