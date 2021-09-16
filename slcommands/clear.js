module.exports = {
    name: 'clear',
    description: 'Clear messages!',
    async execute(client, interaction){
        res=true
        if(!interaction.member.permissions.has("BAN_MEMBERS")) return false;
        amount=interaction.options._hoistedOptions[0].value
        if(amount > 100) return false
        if(amount < 1) return false
        targetChannel= await client.channels.cache.get(interaction.channelId)
        await targetChannel.messages.fetch({limit: amount}).then(messages =>{
            targetChannel.bulkDelete(messages).catch(e=>res=false)
        }).catch(e=>res=false)
        return res
    }
}