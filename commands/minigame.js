const { SlashCommandBuilder } = require('@discordjs/builders');
const { IntegrationApplication } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('minigame')
		.setDescription('Choose a random minigame to play')
		.addStringOption(option => option.setName('category').setDescription('4p, 3v1, 2v2, or battle').setRequired(true)
        .addChoice('4P', 'four')
        .addChoice('1v3', 'three')
        .addChoice('2v2', 'two')
        .addChoice('battle', 'battle')),
	async execute(interaction) {
		const value = interaction.options.getString('category');
        // console.log(value);
        if ( value == 'four' )
        {
            const four = ['Lava Tile Isle', 'Hot Rope Jump', 'Shell Shocked', 'Toad in the Box', 'Mecha-Marathon', 'Roll Call', 'Abandon Ship', 'Plaktform Peril', 'Totem Pole Pound',
                            'Bumper Balls', 'Bombs Away', 'Tipsy Tourney', 'Honeycomb Havoc', 'Hexagon Heat', 'Skateboard Scamper', 'Slot Car Derby', 'Shy Guys Says', 'Sneak \'n\' Snore',
                            'Dizzy Dancing', 'Tile Driver', 'Deep Sea Salvage'];
            const rand = Math.floor(Math.random() * four.length);
            return interaction.reply( four[rand] );
        }
        else if ( value == 'three' )
        {
            const three = ['Bowl Over', 'Crane Game', 'Move to the Music', 'Bob-omb Barrage', 'Look Away', 'Shock, Drop or Roll', 'Lights Out', 'Filet Relay', 'Archer-ival', 'Quicksand Cache', 
                            'Rainbow Run'];
            const rand = Math.floor(Math.random() * three.length);
            return interaction.reply( three[rand] );
        }
        else if ( value == 'two' )
        {
            const two = ['Toad Bandstand', 'Bobsled Run', 'Handcar Havoc', 'Balloon Burst', 'Sky Pilots', 'Speed Hockey', 'Cake Factory', 'Magnet Carta', 'Looney Lumberjacks', 
                        'Torpedo Targets', 'Destruction Duet', 'Dungeon Dash'];
            const rand = Math.floor(Math.random() * two.length);
            return interaction.reply( two[rand] );

        }
        else if ( value == 'battle' )
        {
            const battle = ['Grab Bag', 'Bumper Balloon Cars', 'Rakin\' em in', 'Day at the Races', 'Face Lift', 'Crazy Cutters', 'Hot Bob-omb', 'Bowser\'s Big Blast'];
            const rand = Math.floor(Math.random() * battle.length);
            return interaction.reply( battle[rand] );
        }
		return interaction.reply('Put in the right arguments dummy!');
	},
};