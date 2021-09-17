const { MessageEmbed }= require('discord.js')
const db = require('quick.db')
module.exports={
    name: "confess",
    description: "Sends a confession",
    async execute(client,interaction){
        const settings = await db.get(interaction.guildId)
        const colors=['#FF0000',"#9D95DF","#00FF00","#0000FF","#FFFF00","#00FFFF","#FF00FF","#000000","#FF00BF"]
        let color=colors[Math.floor(Math.random()*10)]
        user=interaction.member.user.username
        confession=interaction.options._hoistedOptions[0].value
        const confessEmbed=new MessageEmbed()
        .setTitle("Confession")
        .setColor(color)
        .setDescription(confession);
        await client.channels.cache.get(settings.logChannel).send(`\`${user}\`:\n${confession}`)
        await client.channels.cache.get(settings.confessChannel).send({embeds:[confessEmbed]})
        return `Your confession has been submitted in ${interaction.guild.channels.cache.get(settings.confessChannel)}!`
    }
}