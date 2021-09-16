const ms = require("ms")
const redis = require("../redis");
const db = require('quick.db')
module.exports = {
    name: "mute",
    description: "Mutes someone",
    async execute(client, interaction) {
        settings = db.get(interaction.guildId)
        if (settings.muteRole == null) return false;
        targetid = undefined
        seconds = undefined
        redis.expire(message => {
            if (message.startsWith("muted-")) {
                console.log("Expired: ", message);
                const split = message.split('-')
                const guildname = client.guilds.cache.get(split[2])
                const username = guildname.members.cache.get(split[1])
                username.roles.remove(client.config.muteRole).catch(e => console.log(e))
            }
        })
        res = true
        if (!interaction.member.permissions.has("KICK_MEMBERS")) return false;
        optionsarray = interaction.options._hoistedOptions
        await optionsarray.forEach(option => {
            if (option.name == 'user') targetid = option.value
            else if (option.name == 'duration') seconds = ms(option.value) / 1000;
        })
        target = interaction.member.guild.members.cache.get(targetid)
        if (!target) return false
        const redisClient = await redis()
        try {
            const rediskey = `muted-${targetid}-${interaction.guildId}`
            if (!seconds) redisClient.set(rediskey, 'true')
            else redisClient.set(rediskey, 'true', 'EX', seconds)
        } finally {
            redisClient.quit()
        }
        await target.roles.add(settings.muteRole).catch(e => res = false)
        return res

    }
}