// require the necessary discord.js classes
const fs = require ('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

// create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
// const client = new Discord.Client();

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//set global variables
let coinRecord;
global.coinRecord = 0;
global.DKwins = 0;
global.yoshiWins = 0;
global.warioWins = 0;
global.peachWins = 0;

global.bmt = 0;

global.beer = [];

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// when the client is ready run this once (to prompt it's ready)
client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity('Looking for Jeffery...'/*, {type: 'PLAYING'}*/);
});

// once ready set activity
// client.user.setActivity('Looking for Jeffery...', { type: 'COMPETING' });

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephmeral: true });
	}

});

// login with the bot's token
client.login(token);