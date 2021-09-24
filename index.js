const { Client, Intents, Collection } = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const DisTube = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const db = require("quick.db")
const setDefaultConfig = require('./utils/setDefaultConfig')
const snoowrap = require("snoowrap")
const embeds=require('./utils/embeds')
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
})
dotenv.config()
var text = fs.readFileSync("./utils/hangmanwords.txt", "utf-8");
client.hangwords = text.split("\n");
client.reddit = new snoowrap({
    clientId: process.env.REDDITID,
    userAgent: process.env.REDDIT_AGENT,
    clientSecret: process.env.REDDITSECRET,
    username: process.env.REDDIT_USERNAME,
    password: process.env.REDDITPASS
});
client.setDefaultConfig = setDefaultConfig;
client.embeds=embeds;
client.distube = new DisTube.default(client, { emitNewSongOnly: true, updateYouTubeDL: false, nsfw: true, leaveOnStop: false, plugins: [new SpotifyPlugin(), new SoundCloudPlugin()] });
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

fs.readdir("./songevents/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        const songevent = require(`./songevents/${file}`);
        let songEventName = file.split(".")[0];
        client.distube.on(songEventName, songevent.bind(null, client));
        delete require.cache[require.resolve(`./songevents/${file}`)];
    });
});

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

client.login(process.env.DISCORD_TOKEN)
