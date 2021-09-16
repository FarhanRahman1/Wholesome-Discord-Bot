const redis = require("../redis");
const db=require('quick.db')
module.exports = {
    name: "unmute",
    description: "Unmutes someone",
    async execute(client, interaction) {
        settings=db.get(interaction.guildId)
        if(settings.muteRole==null)return false;
        res=true
        if(!interaction.member.permissions.has("KICK_MEMBERS")) return false;
        targetid = interaction.options._hoistedOptions[0].value
        target = interaction.member.guild.members.cache.get(targetid)
        if(!target) return false;
        if(!target.roles.cache.some(role=>role.id==settings.muteRole)) return false;
        const redisClient = await redis()
        try {
            const rediskey = `muted-${targetid}-${interaction.guildId}`
            redisClient.del(rediskey, function(err, response) {
                if (response != 1) console.log("Redis error: Couldn't delete from database: "+rediskey);
             })
        } finally {
            redisClient.quit()
        }
        await target.roles.remove(setings.muteRole).catch(e => res = false)
        return res
    }
}