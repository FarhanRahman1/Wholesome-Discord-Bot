exports.run=(client,message,args)=>{
    sub=client.reddit.getSubreddit("wholesomememes")
    function getpost(){
        sub.getRandomSubmission().then(post=>{
            if(post.post_hint=="image") message.reply({files:[post.url]})
            else getpost()
        }).catch(e=>console.log(e))
    }
    getpost()
}
exports.aliases=['w']