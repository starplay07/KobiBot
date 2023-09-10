const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
            .setName("ligma")
            .setDescription("ligma shit"),
    async execute(interaction) {
        await interaction.reply("hurensohn")
    }
}