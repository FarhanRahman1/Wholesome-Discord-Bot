const db = require('quick.db')
module.exports = {
    name: "kick",
    description: "Kicks someone",
    async execute(client, interaction) {
        const settings =await db.get(interaction.guildId)
        if(!interaction.member.permissions.has("KICK_MEMBERS")) return "You don't have permissions to do that.";
        targetid = interaction.options._hoistedOptions[0].value
        target = interaction.member.guild.members.cache.get(targetid)
        if(!target) return "User isn't in that server.";
        if(target.roles.cache.some(role=>settings.adminRoles.includes(role.name))) return "I can't kick an admin."
        await target.kick().catch(e => res = false)
        return `${target.user} has been kicked.`
    }
}