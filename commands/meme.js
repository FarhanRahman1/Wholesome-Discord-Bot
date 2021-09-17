exports.run=(client,message,args)=>{
    subs=['dankmemes','memes']
    sub=client.reddit.getSubreddit(subs[Math.floor(Math.random()*2)])
    function getpost(){
        sub.getRandomSubmission().then(post=>{
            if(post.post_hint=="image") message.reply({files:[post.url]})
            else getpost()
        }).catch(e=>console.log(e))
    }
    getpost()
}