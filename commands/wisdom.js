exports.run = (client, message, args) => {
    fetch("https://zenquotes.io/api/random").then(res => { return res.json() }).then(data => {
        return data[0]["q"] + " -" + data[0]["a"]
    }).then(quote => message.reply(quote)).catch(e => console.log(e))
}
exports.aliases=['inspire']
exports.isSong=false