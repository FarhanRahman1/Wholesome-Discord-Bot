const jimp = require("jimp")
const redis = require("../utils/redis")
const db = require('quick.db')
module.exports = async (client, member) => {
    let settings = await db.get(member.guildId)
    const redisClient = await redis()
    try {
        redisClient.get(`muted-${member.id}-${member.guild.id}`, (err, result) => {
            if (err) console.error("Redis get Error: " + err);
            else if (result) {
                const role = member.guild.cache.find(role => role.id === settings.muteRole)
                if (role) member.roles.add(role).catch(e => console.log(e))
            }
        })
    } finally {
        redisClient.quit()
    }
    welcomeChannel = member.guild.channels.cache.get(settings.welcomeChannel)
    if (settings.welcomeRole != null) member.roles.add(settings.welcomeRole);
    if (settings.welcomeChannel == null) return;
    let font110 = await jimp.loadFont("./assets/fonts/unisans110.fnt")
    let font50 = await jimp.loadFont("./assets/fonts/unisans50.fnt")
    let font35 = await jimp.loadFont("./assets/fonts/unisans35.fnt")
    let mask = await jimp.read('./assets/images/mask.png')
    await jimp.read(member.user.displayAvatarURL({ format: 'jpg' })).then(avatar => {
        avatar.resize(300, 300)
        mask.resize(300, 300)
        avatar.mask(mask)
        jimp.read("./assets/images/banner.jpg").then(welcome => {
            welcome.resize(1100, 600)
            welcome.print(font110, 0, 320, {
                text: 'Welcome',
                alignmentX: jimp.HORIZONTAL_ALIGN_CENTER
            }, 1100)
            welcome.print(font50, 0, 440, {
                text: member.user.username,
                alignmentX: jimp.HORIZONTAL_ALIGN_CENTER
            }, 1100)
            welcome.print(font35, 0, 490, {
                text: `You are our ${member.guild.memberCount}th member!`,
                alignmentX: jimp.HORIZONTAL_ALIGN_CENTER
            }, 1100)
            welcome.composite(avatar, 400, 20).writeAsync('newbanner.jpg').then(item => {
                welcomeChannel.send({ content: `${member.user}`, files: ['newbanner.jpg'] });
            })
        })
    })
}
