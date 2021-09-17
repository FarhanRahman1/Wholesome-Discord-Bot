const ms = require("ms")
const redis = require("../utils/redis");
const db = require('quick.db')
module.exports = {
    name: "mute",
    description: "Mutes someone",
    async execute(client, interaction) {
        settings = db.get(interaction.guildId)
        if (settings.muteRole == null) return "Mute roles aren't configured yet.";
        targetid = undefined
        seconds = undefined
        redis.expire(message => {
            if (message.startsWith("muted-")) {
                console.log("Expired: ", message);
                const split = message.split('-')
                const guildname = client.guilds.cache.get(split[2])
                const username = guildname.members.cache.get(split[1])
                username.roles.remove(db.get(split[2]).muteRole).catch(e => console.log(e))
            }
        })
        if (!interaction.member.permissions.has("KICK_MEMBERS")) return "You don't have permissions to do that.";
        optionsarray = interaction.options._hoistedOptions
        await optionsarray.forEach(option => {
            if (option.name == 'user') targetid = option.value
            else if (option.name == 'duration') seconds = option.value;
        })
        target = interaction.member.guild.members.cache.get(targetid)
        if(!target) return "That member isn't in the server."
        if (target.roles.cache.some(role=>settings.adminRoles.includes(role.name))) return "I can't mute an admin!"
        const redisClient = await redis()
        try {
            const rediskey = `muted-${targetid}-${interaction.guildId}`
            if (!seconds) redisClient.set(rediskey, 'true')
            else redisClient.set(rediskey, 'true', 'EX', ms(seconds)/1000)
        } finally {
            redisClient.quit()
        }
        await target.roles.add(settings.muteRole).catch(e => res = false)
        if(!seconds)return `${target.user} has been muted.`
        else return `${target.user} has been muted for ${seconds}`

    }
}