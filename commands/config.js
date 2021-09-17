const db = require('quick.db');
exports.run = async (client, message, args) => {
    let settings = db.get(message.guildId)
    if (args[0] == "show") {
        let msg = ""
        for (let [key, value] of Object.entries(settings)) {
            msg = msg + key + " : " + String(value) + "\n"
        }
        return message.reply(msg)
    }
    if (message.member.id != settings.owner) return message.reply("Only the owner can change configs.")
    if (!args[0] || !args[1]) return message.reply("not a valid argument")
    if (!(args[0] in settings)) return message.reply("Not a valid argument");
    if (args[0] == "adminRoles" && args[1]=="+") {
        await args.slice(2).forEach(role => {
            settings.adminRoles.push(role)
        });
    } else if (args[0] == "adminRoles" && args[1]=="-") {
        await settings.adminRoles.forEach((role, i) => {
            if (role == args[2]) settings.adminRoles.splice(i, 1)
        })
    } else settings[args[0]] = args[1];
    db.set(message.guildId, settings)
    message.react("✅")
}