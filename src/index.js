require	("dotenv").config()
const { Client, IntentsBitField, Events, Collection } = require("discord.js")
const fs = require("fs")

const client = new Client({intents: [IntentsBitField.Flags.Guilds],})

client.once("ready", () => {
    console.log(`Ready! Logged in as ${client.user.tag}! I am on ${client.guilds.cache.size} guild(s)!`)
    client.user.setActivity(
        'kobi less go',  //name, der sein muss
        {  
            name: "spielt auf dem CDiA Server" , //ab hier options die optional sind
            type: 0
        })
})

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.login(process.env.DISCORD_BOT_TOKEN)


