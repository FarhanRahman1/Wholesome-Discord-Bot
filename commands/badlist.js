const db = require("quick.db")
exports.run=(client,message,args)=>{
    message.reply(`The banned words are:\n${db.get(`${message.guildId}.badwords`).join(" , ")}`).catch(e=>console.log(e))
}
exports.aliases=['bl']