const db = require('quick.db')
module.exports = async (client, message) => {
  if (message.author.bot) return;
  let settings = await db.get(message.guildId)
  if (settings == null) settings = await client.setDefaultConfig.run(message.guildId)
  if (message.content.indexOf(settings.prefix) !== 0) {
    if (message.member.roles.cache.some(role => settings.adminRoles.includes(role.name))) return;
    emojiwords = message.content.toLowerCase().match(/<a:.+?:\d+>|<:.+?:\d+>/g);
    if (emojiwords == null) emojiwords = []
    await settings.badwords.some(word => {
      if (message.content.toLowerCase().includes(word) && !emojiwords.some(emoji => emoji.includes(word))) {
        message.delete().then(res => message.channel.send(`${message.member.user} Please do not swear!`))
      }
    })
    return;
  };
  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
  if (!cmd) return;
    if (cmd.isSong) {
      if (message.member.voice.channel == null) return message.reply("You need to be connected to a voice channel first.")
      else if (message.member.voice.channel.id != settings.voiceChannel && settings.voiceChannel != null) return message.reply("I'm playing in a different channel right now.")
    }
  cmd.run(client, message, args);
};
