const db = require('quick.db')
module.exports={
    name: "msg",
    description: "none",
    async execute(client,interaction){
        const settings = await db.get(interaction.guildId)
        if (interaction.member.id != settings.owner) return "You can't use this command."
        msg=undefined
        ci=undefined
        mi=undefined
        options= await interaction.options._hoistedOptions
        await options.forEach(option=>{
            if(option.name=='m') msg=option.value;
            else if(option.name=='c') ci=option.value;
            else if(option.name=='mi') mi=option.value;
        })
        if(ci && mi) client.channels.cache.get(ci).send({content:msg,reply:{messageReference:mi}})
        else if(ci && !mi) client.channels.cache.get(ci).send(msg)
        else if(!ci && !mi) client.channels.cache.get(settings.generalChannel).send(msg)
        else if(!ci && mi) client.channels.cache.get(settings.generalChannel).send({content:msg,reply:{messageReference:mi}})
        return "Ok"
    }
}