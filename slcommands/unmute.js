const redis = require("../utils/redis");
const db=require('quick.db')
module.exports = {
    name: "unmute",
    description: "Unmutes someone",
    async execute(client, interaction) {
        try{
        let settings=await db.get(interaction.guildId)
        if(settings.muteRole==null)return "Mute roles aren't configured yet.";
        if(!interaction.member.permissions.has("KICK_MEMBERS")) return "You don't have permissions to do that.";
        targetid = interaction.options._hoistedOptions[0].value
        target = interaction.member.guild.members.cache.get(targetid)
        if(!target) return "That user isn't in the server.";
        if(!target.roles.cache.some(role=>role.id==settings.muteRole)) return "Member isn't muted.";
        const redisClient = await redis()
        try {
            const rediskey = `muted-${targetid}-${interaction.guildId}`
            redisClient.del(rediskey, function(err, response) {
                if(err)console.log(err);
                if (response != 1) console.log("Redis error: Couldn't delete from database: "+rediskey);
             })
        } finally {
            redisClient.quit()
        }
        await target.roles.remove(settings.muteRole).catch(e => res = false)
    }catch(e){console.log(e);}
        return `${target.user} has been unmuted.`
    }
}