const snoowrap= require("snoowrap")
var reddit = new snoowrap({
    clientId : process.env.REDDITID,    
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36 Edg/92.0.902.55",
    clientSecret : process.env.REDDITSECRET,
    username : "TheSauronEye",
    password : process.env.REDDITPASS
});
exports.run=(client,message,args)=>{
    if(args.length==0) return;
    sub=reddit.getSubreddit(args[0])
    sub.getRandomSubmission().then(post=>{
        if(post.over_18) message.reply({ content: 'No horny', files:["./assets/images/bonk.jpg"]});
        else if(post.post_hint=="image") message.reply({files:[post.url]})
        else message.reply("Try a different subreddit")
    }).catch(e=>console.log(e))
}
exports.aliases=['r']