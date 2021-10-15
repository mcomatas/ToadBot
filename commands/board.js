const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('board')
		.setDescription('Chooses a random MP2 board to play.'),
	async execute(interaction) {
		const boards = ['Pirate Land', 'Western Land', 'Space Land', 'Mystery Land', 'Horror Land', 'Bowser Land'];
		const rand = Math.floor(Math.random() * 6);
        // const rand = random(0, 6);
		// const b = boards[rand];
		if (rand == 0) {
			await interaction.reply('Pirate Land! Arrrg!');
		}
		else if (rand == 1) {
			await interaction.reply('Western Land! Hootenany galore!');
		}
		else if (rand == 2) {
			await interaction.reply('Space Land! Dude set up the speed trap!');
		}
		else if (rand == 3) {
			await interaction.reply('Fuck Mystery Land. Choose again.');
		}
		else if (rand == 4) {
			await interaction.reply('Horror Land! Damn Toad...');
		}
		else if (rand == 5) {
			await interaction.reply('Bowser Land! Watch out for the parade!');
		}
	},
};