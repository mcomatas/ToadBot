const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('coinrecord')
		.setDescription('Get info on or update the coin record')
        .addSubcommand(subcommand =>
            subcommand
                .setName('get')
                .setDescription('Replies with the current coin record'))
        .addSubcommand(subcommand =>
            subcommand 
                .setName('update')
                .setDescription('Update the coin record')
                .addIntegerOption(option => option.setName('input').setDescription('Input the new coin record').setRequired(true))),
	async execute(interaction) {
		// await interaction.reply(`The current coin record is: ${global.coinRecord}`);
        if(interaction.options.getSubcommand() === 'get' )
        {
            await interaction.reply(`The current coin record is: ${global.coinRecord}`);
        }
        else if(interaction.options.getSubcommand() === 'update' )
        {
            global.coinRecord = interaction.options.getInteger('input');
            await interaction.reply(`The new coin record is ${global.coinRecord}!`);
        }
        else
        {
            await interaction.reply('Put in the right arguments dummy!');
        }
	},
};