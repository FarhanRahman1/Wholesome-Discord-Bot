const db=require('quick.db')
exports.run=async(client,message,args)=>{
    let settings=db.get(message.guildId)
    if(!message.member.roles.cache.some(role=>settings.adminRoles.includes(role.name))) return;
    swords=settings.badwords
    sendlist=[]
    await args.forEach(arg=>{
        if(swords.includes(arg)) {
            swords.splice(swords.indexOf(arg),1)
            sendlist.push(arg)
        }
    })
    settings.badwords=swords
    await db.set(message.guildId,settings)
    message.reply(sendlist.length>0?`${sendlist.join(" ,")} have been removed!`:`Not added yet!`).catch(e=>console.log(e))
}
exports.aliases=['br']