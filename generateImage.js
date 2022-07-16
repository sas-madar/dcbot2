const Canvas = require("canvas")
const Discord = require("discord.js")
const background = "https://i.imgur.com/zvWTUVu.jpg"

const dim = {
    height: 690,
    width: 1000,
    margin: 50
}

const avsize = 256

const av = {
    size: avsize,
    x: dim.width/2 - avsize/2,
    y: dim.height/2 - avsize/2
}

const generateImage = async (member) => {
    let username = member.user.username
    let discrim = member.user.discriminator
    let avatarURL = member.user.displayAvatarURL({format: "png", dynamic: false, size: av.size})

    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext("2d")

    /*// draw in the background
    const backimg = await Canvas.loadImage(background)
    ctx.drawImage(backimg, 0, 0)*/

    // background az hungarian flag
    ctx.fillStyle = "rgba(255,0,0,1)"
    ctx.fillRect(0,0,dim.width,dim.height/3)
    ctx.fillStyle = "rgba(255,255,255,1)"
    ctx.fillRect(0,dim.height/3,dim.width,dim.height/3)
    ctx.fillStyle = "rgba(0,255,0,1)"
    ctx.fillRect(0,(dim.height/3)*2,dim.width,dim.height/3)

    // draw black tinted box
    ctx.fillStyle = "rgba(0,0,0,0.8)"
    ctx.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin, dim.height - 2 * dim.margin)

    const avimg = await Canvas.loadImage(avatarURL)
    ctx.save()
    
    ctx.beginPath()
    ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avimg, av.x, av.y)
    ctx.restore()

    // write in text
    ctx.fillStyle = "white"
    ctx.textAlign = "center"

    // draw in Welcome
    ctx.font = "50px Roboto"
    ctx.fillText("Köszöntelek", dim.width/2, dim.margin + 110)

    // draw in the username
    ctx.font = "60px Roboto"
    ctx.fillText(username, dim.width/2, dim.height - dim.margin - 80)

    // draw in to the server
    /*ctx.font = "40px Roboto"
    ctx.fillText("to the server", dim.width / 2, dim.height - dim.margin - 50)*/

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")
    return attachment
}

module.exports = generateImage