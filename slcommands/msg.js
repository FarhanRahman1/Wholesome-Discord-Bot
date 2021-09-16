module.exports={
    name: "msg",
    description: "none",
    async execute(client,interaction){
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
        else if(!ci && !mi) client.channels.cache.get("882609100943417344").send(msg)
        else if(!ci && mi) client.channels.cache.get("882609100943417344").send({content:msg,reply:{messageReference:mi}})
    }
}