const Discord = require("discord.js")
require("dotenv").config()

//const generateImage = require("./generateImage")

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

var bot = {
    client,
    prefix: ".",
    owners: ["730344388923883581"]
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)

client.loadEvents(bot, false)
client.loadCommands(bot, false)

module.exports = bot

/*
// when started
client.on('ready', () => {
    console.log(`${client.user.tag}`)
})
*/
// when message recieved in server
var accountId

client.on('messageCreate', (message) => {
    if(message.content.toLowerCase().startsWith(".id")){
        var txt = message.content.split(" ")
        if(txt[1]) accountId = txt[1]
        else if(accountId) message.channel.send(accountId)
        else message.channel.send("Nincs id beállítva.")
    }

    if(message.channel.id != "997892404952715375") return
    if(!accountId && !message.author.bot) return message.reply("Állítsd be az id-t mielőtt ezt a szobát használod!")
    client.users.cache.forEach((user) => {
        var id = user.id
        if(id == accountId){
            user.send(message.content)
        }
    })

    //client.users.cache.get(accountId).send(`${message.content}`)
})
/*
// when member added/joined
const wcid = "934771375523115009"
client.on('guildMemberAdd', async (member) =>{
    const img = await generateImage(member)
    member.guild.channels.cache.get(wcid).send({
        content: `<@${member.id}>`,
        files: [img]
    })
})
*/
// login / start
client.login(process.env.TOKEN)