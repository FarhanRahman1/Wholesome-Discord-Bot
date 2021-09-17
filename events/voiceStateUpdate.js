const db=require('quick.db')
module.exports = async(client, oldState, newState) => {
    if (oldState.member.id == client.user.id && oldState.channel) {
        db.set(`${oldState.guild.id}.voiceChannel`,null)
        client.user.setActivity("Wholesome Posting Server", { type: "WATCHING" })
    }
    if(newState.member.id == client.user.id && newState.channel){
        db.set(`${newState.guild.id}.voiceChannel`,newState.channelId)
    }
}