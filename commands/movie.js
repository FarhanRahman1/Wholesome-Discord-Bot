const {MessageEmbed}=require("discord.js")
const imdb=require("imdb-api")
exports.run =(client,message,args)=>{
    if(args.length==0) return;
    movieName=args.join(" ");
    var director="Null";
    var genre="Null";
    var rating="Null";
    var year="Null";
    imdb.get({name: movieName}, {apiKey: process.env.OMDBKEY, timeout: 30000}).then((movies)=>{
        return movies;
    }).then((mubi)=>{
        var mubiplot = mubi.plot;
        if(mubi.director) director=mubi.director;
        if(mubi.genres) genre=mubi.genres;
        if(mubi.ratings[0]) rating=mubi.ratings[0].value;
        if(mubi.year) year=mubi.year;
        const newEmbed = new MessageEmbed()
        .setColor('#9D95DF')
        .setTitle(mubi.title)
        .setURL(mubi.imdburl)
        .setDescription(mubiplot)
        .setImage(mubi.poster)
        .addFields(
            { name: "Director", value: director },
            { name: 'Genre', value: genre, inline: true },
            { name: 'Rating', value: rating, inline: true },
        )
        .addField('Year', String(year), true);
        message.channel.send({embeds:[newEmbed]});
    })
}
exports.aliases=['m']