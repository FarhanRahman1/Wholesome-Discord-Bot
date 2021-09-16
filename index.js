const { Client, Intents, Collection } = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const DisTube = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const db = require("quick.db")
const setDefaultConfig = require('./setDefaultConfig')
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
})
client.setDefaultConfig=setDefaultConfig;
client.distube = new DisTube.default(client, { emitNewSongOnly: true, updateYouTubeDL: false, nsfw: true, leaveOnStop: false, plugins: [new SpotifyPlugin(), new SoundCloudPlugin()] });
dotenv.config()
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});
client.aliases = new Collection()
client.commands = new Collection();
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
        if (props.aliases) props.aliases.forEach(alias => client.aliases.set(alias, commandName))
    });
});
client.slcommands = new Collection();
const slcommandFiles = fs.readdirSync('./slcommands/').filter(file => file.endsWith('.js'));
for (const file of slcommandFiles) {
    const slcommand = require(`./slcommands/${file}`);

    client.slcommands.set(slcommand.name, slcommand);
}

const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
    .on("playSong", (queue, song) => {
        guildId=queue.textChannel.guildId
        channelId=queue.textChannel.id
        db.set(`${guildId}.sid`,queue.textChannel.id)
        db.set(`${guildId}.isFirst`,channelId)
        if (song.playlist) queue.textChannel.send(`\`${song.playlist.name}\` playlist (${song.playlist.songs.length} songs).\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`)
        else queue.textChannel.send(`Playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`)
        if (queue.autoplay && queue.songs.length == 1) queue.addRelatedSong().catch(e => { console.log(e); })
        client.user.setActivity(`🎵${song.name} in ${queue.voiceChannel.name}🎵`, { type: "PLAYING"})
    })
    .on("addSong", (queue, song) => {
        queue.textChannel.send(`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)
    })
    .on("addList", (queue, playlist) => queue.textChannel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    ))
    .on("searchResult", (message, results) => {
        message.channel.send(`**Choose an option from below**\n${results.map((song, i) => `**${i + 1}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
    })
    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("error", (channel, error) => console.log("Distube error: " + error))
    
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

client.login(process.env.DISCORD_TOKEN)
