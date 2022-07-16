const Discord = require("discord.js")
require("dotenv").config()

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
})

// when started
client.on('ready', () => {
    console.log(`${client.user.tag}`)
})

// when message recieved in server
client.on('messageCreate', (message) => {
    var msg = message.content
    if(msg == "test") message.reply("done")
})

// login / start
client.login(process.env.TOKEN)