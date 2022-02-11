/*AUTHOR: Michael Comatas
This project is based off of this guide: https://discordjs.guide 
I have taken code snippets from here to build ToadBot */

// require the necessary discord.js classes
const fs = require ('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const queue = require('./queue.js');
const Sequelize = require('sequelize');

// create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
// const client = new Discord.Client();

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//database stuff
//might need to remove this from this file
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Tags = sequelize.define('tags', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	description: Sequelize.TEXT,
	username: Sequelize.STRING,
	usage_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},

});
//ends here

//set global variables
global.adminID = 90603115727839232; //this is my discord ID, using for permission reasons

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
	client.commands.set(command.data.name, command);
}

// when the client is ready run this once (to prompt it's ready)
client.once('ready', () => {
	console.log('Ready!');//don't need this, just prints to the console showing the bot is running and ready
	client.user.setActivity('Looking for Jeffery...'/*, {type: 'PLAYING'}*/);//sets the bot activity
	Tags.sync();//database stuff, creates the table when the bot is ready
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