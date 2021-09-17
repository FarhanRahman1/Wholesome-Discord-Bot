const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
exports.run = async (client, message) => {
    const helpEmbed = await client.embeds.helpGeneral()
    const songEmbed = await client.embeds.helpSong()
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('p')
                .setLabel('Previous')
                .setStyle('PRIMARY')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('n')
                .setLabel('Next')
                .setStyle('PRIMARY')
        )
    await message.reply({
        embeds: [helpEmbed],
        components: [row]
    }).then(msg=>{
        const collector = message.channel.createMessageComponentCollector({time:60000});
        collector.on('collect', async i => {
            if (i.customId === 'n') await i.update({ embeds: [songEmbed], components: [row] });
            else if (i.customId == 'p') await i.update({ embeds: [helpEmbed], components: [row] });
        })
        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    })
}