module.exports = {
    name: 'clear',
    description: 'Clear messages!',
    async execute(client, interaction){
        if(!interaction.member.permissions.has("BAN_MEMBERS")) return "You don't have permissions to do that.";
        amount=interaction.options._hoistedOptions[0].value
        if(amount > 100 || amount < 1) return "Can't delete more than 100 or less than 1 messages"
        targetChannel= await client.channels.cache.get(interaction.channelId)
        await targetChannel.messages.fetch({limit: amount}).then(messages =>{
            targetChannel.bulkDelete(messages).catch(e=>console.log(e))
        }).catch(e=>console.log(e))
        return `${amount} messages deleted.`
    }
}