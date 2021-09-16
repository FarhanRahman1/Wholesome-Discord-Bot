const db = require("quick.db");
module.exports = (client, guild) => {
    client.setDefaultConfig.run(guild.id)
}