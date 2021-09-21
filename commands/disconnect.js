exports.run = (client, message, args) => {
    if (!message.guild.me.voice.channel) return message.reply("I'm not in any voice channel");
    message.guild.me.voice.disconnect();
    message.react('✅')
}
exports.aliases=['dc']
exports.isSong=true