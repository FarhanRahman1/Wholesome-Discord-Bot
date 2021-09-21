const { MessageActionRow, MessageButton } = require('discord.js')
exports.run = async (client, message, args) => {
    const queue = await client.distube.getQueue(message)
    if (!queue) return message.reply({ embeds: [await client.embeds.custom("Queue is empty.")] })
    let pageEmbeds = []
    let pages = 0
    if (queue.songs.length % 10 == 0) pages = (queue.songs.length / 10)
    else pages = (queue.songs.length / 10) + 1
    let j=1;
    for (let i = 0; i < pages; i++) {
        pageEmbeds.push(await client.embeds.newQueue(queue, j, j + 10))
        j+=10
    }
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('pr')
                .setLabel('Previous')
                .setStyle('PRIMARY')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('ne')
                .setLabel('Next')
                .setStyle('PRIMARY')
        );
    j = 0;
    message.reply({ embeds: [pageEmbeds[j]], components: [row] }).then(msg => {
        const collector = message.channel.createMessageComponentCollector({ time: 60000 });
        collector.on('collect', async i => {
            if (i.customId === 'ne' && j < pageEmbeds.length - 1) {
                j++;
                await i.update({ embeds: [pageEmbeds[j]], components: [row] });
            }
            else if (i.customId == 'pr' && j > 0) {
                j--;
                await i.update({ embeds: [pageEmbeds[j]], components: [row] });
            }
        })
        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    })
}
exports.aliases = ['q']
exports.isSong=true