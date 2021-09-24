const db = require('quick.db');
module.exports = async (client, interaction) => {
    const settings = db.get(interaction.guildId)
    if (settings == null) settings = await client.setDefaultConfig(interaction.guildId)
    if (!interaction.isCommand() || interaction.isButton()) return;
    const { commandName, options } = interaction
    client.slcommands.get(commandName).execute(client, interaction).catch(e=>interaction.reply({
        content: "Oh no looks like there was an unknown error",
        ephemeral: true
    })).then(res => interaction.reply({
        content: commandName=="hangman"?"\u200B":res,
        embeds:commandName=="hangman"?[res]:[],
        ephemeral: ['mute', 'kick', 'ban', 'unmute', 'clear','hangman'].includes(commandName) ? false : true
    }))
}