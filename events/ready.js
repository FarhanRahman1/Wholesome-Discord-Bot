const db = require('quick.db');
module.exports = (client) => {
  const guilds = client.guilds.cache.map(guild => guild.id)
  client.user.setActivity("Wholesome Posting Server", { type: "WATCHING" })
  console.log(`Ready to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers`);
  const guild = client.guilds.cache.get("862622743106551808")
  let slcommands
  if (guild) slcommands = guild.commands
  else slcommands = client.application?.commands
  slcommands?.create({
    name: "ping",
    description: "replies with pong",
  })
  slcommands?.create({
    name: "mute",
    description: "Mutes a member.",
    options: [
      {
        name: "user",
        description: "The user to be muted",
        required: true,
        type: 9
      },
      {
        name: "duration",
        description: "2s, 15m, 3h, 20d, etc",
        required: false,
        type: 3
      }
    ]
  })
  slcommands.create({
    name: "kick",
    description: "Kicks a member.",
    options: [
      {
        name: "user",
        description: "The user to be kicked",
        required: true,
        type: 9
      }
    ]
  })
  slcommands.create({
    name: "ban",
    description: "Bans a member.",
    options: [
      {
        name: "user",
        description: "The user to be banned",
        required: true,
        type: 9
      }
    ]
  })
  slcommands.create({
    name: "clear",
    description: "Deletes a specifies number of messages.",
    options: [
      {
        name: "amount",
        description: "Amount of messages to delete",
        required: true,
        type: 4
      }
    ]
  })
  slcommands.create({
    name: "unmute",
    description: "Unmutes a member",
    options: [
      {
        name: "user",
        description: "User to unmute",
        required: true,
        type: 9
      }
    ]
  })
  slcommands.create({
    name: "confess",
    description: "Go on...tell me.. I don't judge",
    options: [
      {
        name: 'confession',
        description: "Type your confession",
        required: true,
        type: 3
      }
    ]
  })
  slcommands.create({
    name: "msg",
    description: "none",
    options: [
      {
        name: "m",
        description: "none",
        required: true,
        type: 3
      },
      {
        name: "c",
        description: "none",
        required: false,
        type: 7
      },
      {
        name: 'mi',
        description: "none",
        required: false,
        type: 3
      }
    ]
  })
}