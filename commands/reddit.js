exports.run=(client,message,args)=>{
    if(args.length==0) return;
    sub=client.reddit.getSubreddit(args[0])
    sub.getRandomSubmission().then(post=>{
        if(post.over_18) message.reply({ content: 'No horny', files:["./assets/images/bonk.jpg"]});
        else if(post.post_hint=="image") message.reply({files:[post.url]})
        else message.reply("Try a different subreddit")
    }).catch(e=>console.log(e))
}
exports.aliases=['r']