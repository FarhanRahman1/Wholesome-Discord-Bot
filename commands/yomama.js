const {Client} = require("dagpijs");
const cl = new Client(process.env.DAGPI_TOKEN);
exports.run=(client,message,args)=>{
    target=message.mentions.users.first();
    if(!target) return message.reply("Mention someone")
    cl.yomama().then((res) => message.channel.send(`${target} ${res.description}`)).catch(e=>console.log(e));
}