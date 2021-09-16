const FB = require("fb")
exports.run = (client, message, args) => {
    FB.setAccessToken(process.env.FBKEY)
    FB.api(
        '/103823794921598',
        'GET',
        { "fields": "posts.limit(50){full_picture,message,permalink_url,status_type}" },
        function check(response){
            if(!response || response.error) return;
            post=response.posts.data[Math.floor(Math.random()*50)]
            if (post.status_type == "added_photos") message.reply({files:[post.full_picture]})
            else check()
        }
    )
}
exports.aliases=['facebook']