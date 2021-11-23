const { SlashCommandBuilder } = require('@discordjs/builders');
// const { execute } = require('./coinrecord');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('wins')
    .setDescription('Get info on or update wins for each player')
    .addSubcommand(subcommand =>
        subcommand
            .setName('get')
            .setDescription('Get the amount of wins of a specific player')
            .addStringOption(option => option.setName('category').setDescription('Pick a player').setRequired(true)
            .addChoice('Donkey Kong', 'DK')
            .addChoice('Wario', 'W')
            .addChoice('Yoshi', 'Y')
            .addChoice('Peach', 'P')))
    .addSubcommand(subcommand =>
        subcommand
            .setName('update')
            .setDescription('Update the amount of wins of a specific player by one')
            .addStringOption(option => option.setName('category').setDescription('Pick a player').setRequired(true)
            .addChoice('Donkey Kong', 'DK')
            .addChoice('Wario', 'W')
            .addChoice('Yoshi', 'Y')
            .addChoice('Peach', 'P'))),
    async execute(interaction) {
        if(interaction.options.getSubcommand() === 'get' )
        {
            const value = interaction.options.getString('category');
            if(value === 'DK')
            {
                await interaction.reply(`Donkey Kong currently has ${global.DKwins} wins`);
            }
            else if(value === 'W')
            {
                await interaction.reply(`Wario currently has ${global.warioWins} wins`);
            }
            else if(value === 'Y')
            {
                await interaction.reply(`Yoshi currently has ${global.yoshiWins} wins`);
            }
            else if(value === 'P')
            {
                await interaction.reply(`Peach currently has ${global.DKwins} wins`);
            }
        }
        else if(interaction.options.getSubcommand() === 'update' )
        {
            const value = interaction.options.getString('category');
            if(value === 'DK')
            {
                global.DKwins++;
                await interaction.reply(`Donkey Kong now has ${global.DKwins} wins`);
            }
            else if(value === 'W')
            {
                global.warioWins++;
                await interaction.reply(`Wario now has ${global.warioWins} wins`);
            }
            else if(value === 'Y')
            {
                global.yoshiWins++;
                await interaction.reply(`Yoshi now has ${global.yoshiWins} wins`);
            }
            else if(value === 'P')
            {
                await interaction.reply('Erm there was an error trying to execute this command');
                //global.peachWins++;
                //await interaction.reply(`Peach now has ${global.peachWins} wins`);
            }
        }
        else
        {
            await interaction.reply('Put in the right arguments dummy!' );
        }
    }
}