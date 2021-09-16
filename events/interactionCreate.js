module.exports = async (client, interaction) => {
    if (!interaction.isCommand() && !interaction.isButton()) return;
    const { commandName, options } = interaction
    if (commandName == "ping") {
        interaction.reply({
            content: "pong",
            ephemeral: true
        })
    } else if (commandName == "mute") {
        client.slcommands.get("mute").execute(client, interaction).then(res => {
            if (interaction.options._hoistedOptions.length == 1) interaction.reply({
                content: res ? `${interaction.options._hoistedOptions[0].user} has been muted!` : "Couldn't mute the member!"
            }); else interaction.reply({
                content: res ? `${interaction.options._hoistedOptions[0].user} has been muted for ${interaction.options._hoistedOptions[1].value}` : "Couldn't mute the member!"
            })
        })
    } else if (commandName == "kick") {
        client.slcommands.get("kick").execute(client, interaction).then(res => {
            interaction.reply({
                content: res ? `${interaction.options._hoistedOptions[0].user} has been kicked!` : "Couldn't kick the member!"
            })
        })
    } else if (commandName == "ban") {
        client.slcommands.get("ban").execute(client, interaction).then(res => {
            interaction.reply({
                content: res ? `${interaction.options._hoistedOptions[0].user} has been banned!` : "Couldn't ban the member!"
            })
        })
    } else if (commandName == "clear") {
        client.slcommands.get("clear").execute(client, interaction).then(res => {
            interaction.reply({
                content: res ? `${interaction.options._hoistedOptions[0].value} messages deleted!` : "Ohno I can't do that!"
            })
        })
    } else if (commandName == "unmute") {
        client.slcommands.get("unmute").execute(client, interaction).then(res => {
            interaction.reply({
                content: res ? `${interaction.options._hoistedOptions[0].user} has been unmuted!` : "Couldn't unmute the member!"
            })
        })
    } else if (commandName == "confess") {
        client.slcommands.get('confess').execute(client, interaction).then(res => {
            interaction.reply({
                content: `Your confession has been submitted in ${interaction.guild.channels.cache.get(client.config.confessChannel)}!`,
                ephemeral: true
            })
        })
    } else if (commandName == "msg") {
        if (interaction.member.id == client.config.owner) client.slcommands.get('msg').execute(client,interaction)
    }
}