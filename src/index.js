require	("dotenv").config()
const { Client, IntentsBitField } = require("discord.js")

const client = new Client({
    intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent,
    ]
})

client.once("ready", () => {
    console.log(`Ready! Logged in as ${client.user.tag}! I am on ${client.guilds.cache.size} guild(s)!`)
    client.user.setActivity(
        'kobi less go',  //name, der sein muss
        {  
            name: "spielt auf dem CDiA Server" , //ab hier options die optional sind
            type: 0
        })
})


client.login(process.env.DISCORD_BOT_TOKEN)


