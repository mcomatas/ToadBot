const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bbc')
		.setDescription('See a picture toad'),
	async execute(interaction) {
		await interaction.reply({files: ["./horrorLandToad.png"]});
	},
};