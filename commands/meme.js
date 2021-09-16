const snoowrap= require("snoowrap")
var reddit = new snoowrap({
    clientId : process.env.REDDITID,    
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36 Edg/92.0.902.55",
    clientSecret : process.env.REDDITSECRET,
    username : "TheSauronEye",
    password : process.env.REDDITPASS
});
exports.run=(client,message,args)=>{
    subs=['dankmemes','memes']
    sub=reddit.getSubreddit(subs[Math.floor(Math.random()*2)])
    function getpost(){
        sub.getRandomSubmission().then(post=>{
            if(post.post_hint=="image") message.reply({files:[post.url]})
            else getpost()
        }).catch(e=>console.log(e))
    }
    getpost()
}