const redis = require("redis");
const redispath = process.env.REDIS_PATH
module.exports = async () => {
    return await new Promise((resolve, reject) => {
        const client = redis.createClient({
            url: redispath
        })
        client.on('error', (err) => {
            console.error("Redis error: " + err)
            client.quit()
            reject(err)
        })
        client.on('ready', () => {
            resolve(client)
        })
    })
}
module.exports.expire = (callback) => {
    const expired = () => {
        const sub = redis.createClient({ url: redispath })
        sub.subscribe('__keyevent@0__:expired', () => {
            sub.on('message', (channel, message) => {
                callback(message)
            })
        })
    }
    const pub = redis.createClient({ url: redispath })
    pub.send_command('config', ['set', 'notify-keyspace-events', 'Ex'], expired())
}