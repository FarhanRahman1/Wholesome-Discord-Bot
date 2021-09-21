const { Emojify } = require('discord-gamecord');
exports.run = async (client, message, args) => {
    const Text = args.join(" ");
    message.channel.send(await Emojify(Text));
}
exports.isSong=false