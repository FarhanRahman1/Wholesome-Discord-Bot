exports.run=async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.reply({embeds:[await client.embeds.custom('There is nothing playing!')]})
    let mode = null
    switch (args[0]) {
        case "off":
            mode = 0
            break
        case "song":
            mode = 1
            break
        case "queue":
            mode = 2
            break
    }
    mode = client.distube.setRepeatMode(message, mode)
    mode = mode ? mode === 2 ? "Repeat queue" : "Repeat song" : "Off"
    message.reply({embeds:[await client.embeds.repeatMode(mode)]})
}