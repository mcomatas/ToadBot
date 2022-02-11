const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('duel')
        .setDescription('Choose a player to duel, to settle a debate.')
        .addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(true)),
    async execute(interaction) {
        const duelee = interaction.options.getUser('target');
        
        if( interaction.user.id === duelee.id )
        {
            await interaction.reply( 'You can\'t duel yourself dummy!' );
        }
        else
        {
            await interaction.reply(`Duel has started between ${interaction.user} and ${duelee}!`);
            
            /*await interaction.followUp('3...');

            setTimeout(function() {
                interaction.followUp('2...');
            }, 1000 );

            setTimeout(function() {
                interaction.followUp('1...');
            }, 2000 );*/ //this sent 3 messages, I am commenting it out to make ToadBot not spam as much

            setTimeout(function() {
                const rand = Math.floor(Math.random() * 2);
                if( rand === 0 )
                {
                    interaction.followUp(`The winner is ${interaction.user}!`);
                }
                else if( rand === 1 )
                {
                    interaction.followUp(`The winner is ${duelee}!`);
                }
            }, 3000 );
        }
    },
};