const { devs, testServer } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');


module.exports = async (client, interaction) => {
    if(!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try {
        const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName);

        if(!commandObject) return;

        if(commandObject.devOnly){
            if(!devs.includes(interaction.member.id)){
                interaction.reply({
                    content: 'only devs, sorry',
                    ephemeral: true
                });
                return;
            }
        }
        if(commandObject.testOnly){
            if(!(interaction.guild.id === testServer)){
                interaction.reply({
                    content: 'not for this server, sorry',
                    ephemeral: true
                });
                return;
            }
        }
        if(commandObject.permissionsRequired?.length){
            for(const permission of commandObject.permissionsRequired){
                if(!interaction.member.permission.has(permission)){
                    interaction.reply({
                        content: 'npt enough permissions',
                        ephemeral: true,
                    });
                    return;
                }
            }
        }
        await commandObject.callback(client, interaction);
    } catch (error) {
        console.log(`There was an error when running this command: ${error}`);
    }
};