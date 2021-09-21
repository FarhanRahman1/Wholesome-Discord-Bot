const translate = require('@vitalets/google-translate-api');
exports.run=async(client,message,args)=>{
    let langcode="en";
    if(args.length!=0){
        if(args[args.length-1].startsWith("lang")){
            langcode=args[args.length-1].slice(4)
            args.pop()
        }
    }
    if(message.reference!=null){
        let ref=await message.channel.messages.fetch(message.reference.messageId)
        translate(ref.content,{to: langcode}).then(res=>{
            message.reply(res.text)
        }).catch(err=>console.error(err))
    }else if(message.reference==null && args.length!=0){
    translate(args.join(" "), {to: langcode}).then(res => {
        message.reply(res.text)
    }).catch(err => {
        console.error(err);
    });

}else{return message.reply("Enter a text to translate and language code(optional)")}
}
exports.aliases=['tl']