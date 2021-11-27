const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('beer')
		.setDescription('Get a random beer to drink')
        .addSubcommand(subcommand =>
            subcommand
                .setName('get')
                .setDescription('Replies with a random beer from the list'))
        .addSubcommand(subcommand =>
            subcommand 
                .setName('add')
                .setDescription('Add a beer to the list')
                .addStringOption(option => option.setName('input').setDescription('The name of the beer to add').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('See the list of beers')),
	async execute(interaction) {
		// await interaction.reply(`The current coin record is: ${global.coinRecord}`);
        if(interaction.options.getSubcommand() === 'get' )
        {
            if( global.beer.length === 0 )
            {
                await interaction.reply('There are no beers in the list brother');
            }
            else
            {
                const rand = Math.floor(Math.random() * global.beer.length);
                await interaction.reply(`Dude, get some ${global.beer[rand]}!`);
            }
        }
        else if(interaction.options.getSubcommand() === 'add' )
        {
            const value = interaction.options.getString('input');
            global.beer.push(value);
            await interaction.reply('The updated list of beers is:');
            for( i = 0; i < global.beer.length; i++ )
            {
                interaction.followUp(`${global.beer[i]}`);
            }
            // await interaction.reply('working on it');
        }
        else if(interaction.options.getSubcommand() === 'list' )
        {
            // console.log(global.beer);
            if(global.beer.length === 0)
            {
                await interaction.reply('There are no beers in the list brother');
            }
            else
            {
                await interaction.reply('The current list of beers is:\n');
                for( i = 0; i < global.beer.length; i++ )
                {
                    interaction.followUp(`${global.beer[i]}`);
                }
            }
            // await interaction.reply('working on it');
        }
	},
};