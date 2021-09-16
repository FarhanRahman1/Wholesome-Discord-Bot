const {Client} = require("dagpijs");
const cl = new Client(process.env.DAGPI_TOKEN);
exports.run=(client,message,args)=>{
    target=message.mentions.users.first();
    if(!target){
        message.reply("Mention someone to roast")
        return;
    }
    cl.roast().then((res) => message.channel.send(`${target} ${res.roast}`)).catch(e=>console.log(e));
}