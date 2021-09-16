const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
exports.run = async (client, message) => {
    const helpEmbed = new MessageEmbed()
        .setTitle('Wholesome Posting Commands')
        .setColor('#0099ff')
        .setDescription('\`General Commands:\`')
        .setThumbnail('https://i.imgur.com/20l3pQW.jpg')
        .setURL('https://wholesomeposting.com/')
        .addFields(
            { name: 'wholesome', value: 'sends a wholesome meme', inline: true },
            { name: 'meme', value: 'sends a not so wholesome meme', inline: true },
            { name: 'joke', value: 'sends a joke', inline: true },
            { name: 'movie <movie name>', value: 'sends movie details', inline: true },
            { name: 'reddit <subreddit name>', value: 'sends a subreddit post', inline: true },
            { name: 'roast <mention someone>', value: 'roast someone', inline: true },
            { name: 'rockpaper <mention someone>', value: 'challenge someone for a rock paper scissor', inline: true },
            { name: 'snake', value: 'the snake game', inline: true },
            { name: 'tictactoe <mention someone>', value: 'challenge someone for a tictactoe', inline: true },
            { name: 'trivia <mention someone>', value: 'challenge someone for a trivia game', inline: true },
            { name: 'wisdom', value: 'sends a random uplifting quote', inline: true },
            { name: 'yomama <mention someone>', value: 'sends a yomama joke (kinda nsfw)', inline: true },
            { name: 'fb', value: 'sends a meme from our Facebook page', inline: true },
            { name: 'emojify', value: 'emojify your text', inline: true },
            { name: '/confess <confession>', value: 'confess something anonymously' },
            { name: '\u200B', value: '\u200B' },
            { name: '/mute /unmute', value: 'mute/tempmute/unmute someone', inline: true },
            { name: '/kick /ban', value: 'kick/ban someone', inline: true },
            { name: '/clear', value: 'delete bulk messages', inline: true },
            { name: 'badadd <list of words>   badremove <list of words>', value: 'add/remove banned words' },
            { name: 'badlist', value: "shows the banned words" }
        )
        .setTimestamp()
        .setFooter('Page 1 of 2 | Have a wholesome day!', 'https://i.imgur.com/20l3pQW.jpg');

    const songEmbed = new MessageEmbed()
        .setTitle('Wholesome Posting Commands')
        .setColor('#0099ff')
        .setDescription('\`Song Commands:\`(Cannot be accessed unless you are connected to a voice channel)')
        .setThumbnail('https://i.imgur.com/20l3pQW.jpg')
        .setURL('https://wholesomeposting.com/')
        .addFields(
            { name: 'play/p <song name>', value: 'play a song', inline: true },
            { name: 'pause/resume', value: 'pause/resume the song', inline: true },
            { name: 'autoplay/ap', value: 'autoplay songs similar to the playing song', inline: true },
            { name: 'filter off/3d/vaporwave/bassboost/echo/nightcore/karaoke/flanger/gate/haas/reverse/surround/mcompand/phaser/tremolo/earwax', value: 'well you get the point right' },
            { name: 'nowplaying/np', value: 'shows the playing song', inline: true },
            { name: 'queue/q', value: "shows the playing queue" },
            { name: 'remove <song number>', value: 'removes a song from the queue' },
            { name: 'repeat song/queue/off', value: 'repeat the song,queue or turn it off' },
            { name: 'seek <seconds>', value: 'skip the song to the desired time' },
            { name: 'skip', value: 'skip to next song' },
            { name: 'stop', value: 'stop the song/queue' },
            { name: 'volume/v <number>', value: 'set the volume' }
        )
        .setTimestamp()
        .setFooter('Page 2 of 2 | Have a wholesome day!', 'https://i.imgur.com/20l3pQW.jpg');
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('p')
                .setEmoji('◀')
                .setLabel('Previous')
                .setStyle('PRIMARY')
        )
        .addComponents(
            new MessageButton()
                .setCustomId('n')
                .setEmoji('▶')
                .setLabel('Next')
                .setStyle('PRIMARY')
        )
    await message.reply({
        embeds: [helpEmbed],
        components: [row]
    }).then(msg=>{
        const collector = message.channel.createMessageComponentCollector({time:15000});
        collector.on('collect', async i => {
            if (i.customId === 'n') await i.update({ embeds: [songEmbed], components: [row] });
            else if (i.customId == 'p') await i.update({ embeds: [helpEmbed], components: [row] });
        })
        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    })
}