const {Client} = require("dagpijs");
const cl = new Client(process.env.DAGPI_TOKEN);
exports.run=(client,message,args)=>{
    cl.joke().then((res) => message.channel.send(res.joke)).catch(e=>console.log(e));
}
exports.isSong=false