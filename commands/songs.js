const { SlashCommandBuilder } = require('@discordjs/builders');
// const { execute } = require('./board');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('songs')
        .setDescription('A song queue')
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Add a song to the queue')
                .addStringOption(option => option.setName('input').setDescription('Song name').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand 
                .setName('remove')
                .setDescription('Remove the song at the top of the queue'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('look')
                .setDescription('Look at the song at the front of the queue')),
    async execute(interaction) {
        //await interaction.reply('hello');
        if(interaction.options.getSubcommand() === 'add' )
        {
            const value = interaction.options.getString('input');
            global.songQueue.enqueue(value);
            await interaction.reply(`Added ${value} to the song queue`);
            //console.log(global.songQueue);
        }
        else if(interaction.options.getSubcommand() === 'remove')
        {
            if( !global.songQueue.isEmpty() )
            {
                await interaction.reply(`Removed ${global.songQueue.peek()} from the queue`);
                global.songQueue.dequeue();
            }
            else
            {
                await interaction.reply("The song queue is empty");
            }
        }
        else if(interaction.options.getSubcommand() === 'look')
        {
            if( !global.songQueue.isEmpty() )
            {
                await interaction.reply(`The next song in the queue is: ${global.songQueue.peek()}`);
            }
            else
            {
                await interaction.reply("The song queue is empty");
            }
        }
    },
}