const db = require('quick.db')
module.exports = async (client, message) => {
  if (message.author.bot) return;
  let settings=db.get(message.guildId)
  if(settings==null) settings= await client.setDefaultConfig.run(message.guildId)
  if (message.content.indexOf(settings.prefix) !== 0) {
    if (message.member.roles.cache.some(role => settings.adminRoles.includes(role.name))) return;
    emojiwords = message.content.toLowerCase().match(/<a:.+?:\d+>|<:.+?:\d+>/g);
    if (emojiwords == null) emojiwords = []
    await settings.badwords.some(word => {
      if (message.content.toLowerCase().includes(word)) {
        if (!emojiwords.some(emoji => emoji.includes(word))) {
          message.delete().then(res => message.channel.send(`${message.member.user} Please do not swear!`))
        }
      }
    })
    return;
  };
  const songcmds=['autoplay','filter','nowplaying','pause','play','queue','remove','repeat','resume','seek','skip','stop','volume']
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))

  if (!cmd) return;
  if(songcmds.includes(command) || songcmds.includes(cmd.aliases)){
    if(!settings.isFirst && settings.sid!=message.channel.id)return message.reply("I'm playing in a different channel right now.")
  }
  cmd.run(client, message, args);
};
