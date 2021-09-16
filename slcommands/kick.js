
module.exports = {
    name: "kick",
    description: "Kicks someone",
    async execute(client, interaction) {
        res = true
        if(!interaction.member.permissions.has("KICK_MEMBERS")) return false;
        targetid = interaction.options._hoistedOptions[0].value
        target = interaction.member.guild.members.cache.get(targetid)
        if(!target) return false;
        await target.kick().catch(e => res = false)
        return res
    }
}