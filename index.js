// require the necessary discord.js classes
const fs = require ('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

// create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
// const client = new Discord.Client();

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// when the client is ready run this once (to prompt it's ready)
client.once('ready', () => {
	console.log('Ready!');
});

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

	/* const { commandName } = interaction;

	if ( commandName === 'ping' ) {
		await interaction.reply('Pong!');
	} else if ( commandName === 'server' ) {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if ( commandName === 'user' ) {
		await interaction.reply( `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}` );
	}*/
});

// login with the bot's token
client.login(token);


/* const fs = require('fs');
const Discord = require('discord.js');//requires discord.js module
const { prefix, token } = require( './config.json' );

const client = new Discord.Client();//creates a new Discord client
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync( './commands' ).filter(file => file.endsWith( '.js' ) );

//set a new item in the collection
//with the key as the command name and the value as the exported module
for( const file of commandFiles )
{
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

//when the client is ready it runs this code, only triggers once
client.once('ready', ()=> {
	console.log('Ready!');
});

client.on( 'message', message => {
	if( !message.content.startsWith( prefix ) || message.author.bot ) return;

	const args = message.content.slice( prefix.length ).split(/ +/);
	const command = args.shift().toLowerCase();

	if( !client.commands.has(command) ) return;

	try
	{
		client.commands.get(command).execute(message, args);
	}
	catch ( error )
	{
		console.error(error);
		message.reply( 'There was an error trying to execute that command!' );
	}


	/*if( command === 'ping' )
	{
		client.commands.get( 'ping' ).execute( message, args );
	}*/
// else if() more commands if needed, but not going with the if/else chain

// console.log(message.content);//spits out what the user put in to the console
// if( message.content == "!ping" )
// {
//		message.channel.send( 'Pong' );
// }
// if( message.content.startsWith( '${prefix}' ) )
// {
//	message.channel.send( 'Pong' );
// }
// });

// login to discord with the bot's token
// client.login( token );