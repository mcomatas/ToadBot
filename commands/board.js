const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('board')
		.setDescription('Chooses a random MP2 board to play.')
		.addSubcommand( subcommand =>
			subcommand
				.setName( 'random' ) 
				.setDescription( 'A random MP2 board is chosen to play on.' ) )
		.addSubcommand( subcommand => 
			subcommand
				.setName( 'choose' )
				.setDescription( 'Choose a MP2 board to play on by using a Magic Lamp. Can be used once every 12 hours.' )
				.addStringOption( option => option.setName( 'category' ).setDescription( 'Pick a board' ).setRequired(true)
				.addChoice( 'Pirate Land', 'P' )
				.addChoice( 'Western Land', 'W' )
				.addChoice( 'Space Land', 'S' )
				.addChoice( 'Mystery Land', 'M' )
				.addChoice( 'Horror Land', 'H' )
				.addChoice( 'Bowser Land', 'B' ) ) ),
	async execute(interaction) {
		if( interaction.options.getSubcommand() == 'random' )
		{
			// const boards = ['Pirate Land', 'Western Land', 'Space Land', 'Mystery Land', 'Horror Land', 'Bowser Land'];
			const rand = Math.floor(Math.random() * 6);
			switch( rand )
			{
				case 0:
					await interaction.reply('Pirate Land! Arrrg!');
					break;
				case 1:
					await interaction.reply('Western Land! Hootenany galore!');
					break;
				case 2:
					await interaction.reply('Space Land! Dude set up the speed trap!');
					break;
				case 3:
					await interaction.reply('Fuck Mystery Land. Choose again.');
					break;
				case 4:
					await interaction.reply('Horror Land! Damn Toad...');
					break;
				case 5:
					await interaction.reply('Bowser Land! Watch out for the parade!');

			}
		}
		else if( interaction.options.getSubcommand() == 'choose' )
		{
			const target = interaction.options.getUser('user') ?? interaction.user;
        	const user = await Users.findOne({ where: { user_id: target.id } });
        	const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: 'Magic Lamp' } } }); //this is the duel glove item

        	const userItem = await UserItems.findOne({
        	    where: { user_id: target.id, item_id: item.id },
        	}); //this gets the duel glo item attached to the user using the command

			if( userItem.dataValues.amount <= 0 )
			{
				await interaction.reply( "You don't have a magic lamp you can't pick a board" )
			}
			else
			{
				const value = interaction.options.getString('category');
				switch( value )
				{
					case 'P':
						await interaction.reply( 'Yarg me boi! Ye picked a good board!' );
						break;
					case 'W':
						await interaction.reply( 'You better call for a hootenany!' );
						break;
					case 'S':
						await interaction.reply( 'Speed trap? Laser beam? Go crazy.' );
						break;
					case 'M':
						await interaction.reply( "You're crazy for that one. Are you sure?" );
						break;
					case 'H':
						await interaction.reply( 'You wanna see Toad that bad? You got that dog in you...' );
						break;
					case 'B':
						await interaction.reply( "You're asking for trouble with that parade..." );
				}
			}
		}
	},
};