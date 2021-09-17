const db = require('quick.db')
exports.run =async (guildId) => {
    return db.set(guildId, {
        owner: "566541214212423680",
        prefix: ',',
        welcomeChannel: null,
        welcomeRole: null,
        guildid: guildId,
        muteRole: null,
        adminRoles: [],
        confessChannel: null,
        logChannel: null,
        generalChannel: null,
        voiceChannel: null,
        badwords: []
    })
}