/*AUTHOR: Michael Comatas
This project is based off of this guide: https://discordjs.guide 
I have taken code snippets from here to build ToadBot */

// require the necessary discord.js classes
const fs = require ('fs');
const { Client, Collection, Intents, Formatters } = require('discord.js');
const { token, adminId } = require('./config.json');
const queue = require('./queue.js');
//const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { Users, CurrencyShop } = require('./dbObjects.js');
const { resourceUsage } = require('process');
const { currency } = require('./currency.js');

// create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//set global variables
global.adminID = adminId; //this is my discord ID, using for permission reasons

let coinRecord;
global.coinRecord = 200;
global.DKwins = 20;
global.yoshiWins = 21;
global.warioWins = 15;
global.peachWins = 1;

global.bmt = 3;

global.beer = ['Landshark', 'Sour Monkey', 'Miller Lite', 'Corona Premier'];

global.songQueue = new queue();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the collection
	// with the key as the command name and the value as the exported module
	//console.log(command.data.name);
	client.commands.set(command.data.name, command);
}

const activities = ['Looking for Jeffery...', 'Type \"/help" for info']; //rotating activites

// when the client is ready run this once (to prompt it's ready)
client.once('ready', async () => {
	console.log('Ready!');//don't need this, just prints to the console showing the bot is running and ready
	
	const updateDelay = 5;
	let currentIndex = 0;

	setInterval(() => {
		const activity = activities[currentIndex];
		client.user.setActivity(activity);

		//update index here
		currentIndex = currentIndex >= activities.length - 1
			? 0
			: currentIndex + 1;
	}, updateDelay * 1000);
	
	//client.user.setActivity('Looking for Jeffery...'/*, {type: 'PLAYING'}*/);//sets the bot activity

	const storedBalances = await Users.findAll();
	storedBalances.forEach(b => currency.set(b.user_id, b));
});

client.on('messageCreate', async message => {
	if (message.author.bot) return;
	currency.add(message.author.id, 1);
	//console.log(currency.getBalance(message.author.id));
})

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