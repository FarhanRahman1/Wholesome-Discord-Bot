const db=require('quick.db')
module.exports = async(client, oldState, newState) => {
    if (oldState.member.id == client.user.id && oldState.channelId) {
        db.set(`${oldState.guild.id}.sid`,null)
        db.set(`${oldState.guild.id}.isFirst`,true)
        client.user.setActivity("Wholesome Posting Server", { type: "WATCHING" })
    }
}