const Discord = require("discord.js")
require("dotenv").config()

const generateImage = require("./generateImage")

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
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

// when member added/joined
const wcid = "934771375523115009"
client.on('guildMemberAdd', async (member) =>{
    const img = await generateImage(member)
    member.guild.channels.cache.get(wcid).send({
        content: `Welcome <@${member.id}>!`,
        files: [img]
    })
})

// login / start
client.login(process.env.TOKEN)