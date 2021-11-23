const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bmt')
		.setDescription('Get or update the current CMT number')
        .addSubcommand(subcommand =>
            subcommand
                .setName('get')
                .setDescription('Replies with the current bmt amount'))
        .addSubcommand(subcommand =>
            subcommand 
                .setName('update')
                .setDescription('Update bmt by one')),
	async execute(interaction) {
		// await interaction.reply(`The current coin record is: ${global.coinRecord}`);
        if(interaction.options.getSubcommand() === 'get' )
        {
            await interaction.reply(`Mario Party 2 All Stars have seen bmt ${global.bmt} times`);
        }
        else if(interaction.options.getSubcommand() === 'update' )
        {
            global.bmt++;
            await interaction.reply(`The Mario Party 2 All Stars have now seen bmt ${global.bmt} times!`);
        }
        else
        {
            await interaction.reply('Put in the right arguments dummy!');
        }
	},
};