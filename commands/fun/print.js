module.exports = {
    name: "print",
    category: "fun",
    permissions: [],
    devOnly: false,
    run: async ({client, message, args}) =>{
        const txt = args.join(" ")
        message.channel.send(txt)
        message.delete()

    }
}