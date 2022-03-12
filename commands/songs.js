const { SlashCommandBuilder } = require('@discordjs/builders');
const ytdl = require('ytdl-core');
const play = require('play-dl');
const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
    VoiceConnection,
    VoiceConnectionStatus,
} = require('@discordjs/voice');

async function playSong( connection )
{
    const stream = await play.stream( global.songQueue.peek() );
    const resource = createAudioResource(stream.stream, { inputType: stream.type });
                
    player.play(resource);
    connection.subscribe(player);
}

const player = createAudioPlayer(); //audio player, this is global in songs to do things like pause, unpause, etc.
let connection; //the voice connection, needs to be global so the player.on event can access it and playSong again

player.on(AudioPlayerStatus.Idle, () =>
{
    global.songQueue.dequeue();
    
    if( global.songQueue.isEmpty() )
    {
        connection.disconnect();
    }
    else
    {
        setTimeout( () =>
        {
            playSong( connection );
        }, 1000 );
    }
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('songs')
        .setDescription('Commands to play or add songs from YouTube.')
        .addSubcommand( subcommand =>
            subcommand
                .setName('queue')
                .setDescription('Play or queue a song with a YouTube url')
                .addStringOption(option => option.setName('input').setDescription('Give a YouTube URL').setRequired(true)))
        .addSubcommand( subcommand =>
            subcommand
                .setName('playing')
                .setDescription('See what song is currently playing'))
        .addSubcommand( subcommand => 
            subcommand
                .setName('skip')
                .setDescription( 'Skip the current song that\'s playing' ))
        .addSubcommand( subcommand => 
            subcommand
                .setName('pause')
                .setDescription('Pause the current song that\'s playing' ))
        .addSubcommand( subcommand =>
            subcommand
                .setName('unpause')
                .setDescription('Unpuase the song'))
        .addSubcommand( subcommand =>
            subcommand
                .setName('clear')
                .setDescription('Empties the song queue.')),
    async execute(interaction) {
        
        if(interaction.options.getSubcommand() === 'queue')
        {
            
            let youtubeLink = interaction.options.getString('input');
            
            const vc = interaction.member.voice.channel;
            if( !vc ) await interaction.reply( "You need to be in a voice channel to execute this command." );
            else if ( !ytdl.validateURL( youtubeLink ) ) await interaction.reply( "Please input a correct YouTube link." );
            else if ( global.songQueue.isDuplicate( youtubeLink ) ) await interaction.reply( "That song is already in the queue." );
            else 
            { 
                var videoTitle;
                yt_info =  await play.video_info(youtubeLink);
                videoTitle = yt_info.video_details.title;
                
                global.songQueue.enqueue( youtubeLink );
                    
                if( vc.members.some(element => element.user.id === interaction.client.user.id) ) //check to see if the bot is in the VC already.
                {
                    await interaction.reply( `Added ${videoTitle} to the song queue.` );
                }
                else
                {
                    connection = joinVoiceChannel({
                        channelId: vc.id,
                        guildId: interaction.guildId,
                        adapterCreator: interaction.guild.voiceAdapterCreator,
                    });
                    
                    playSong( connection );
                    await interaction.reply(`Now playing ${videoTitle}`)
                }
            }  
        }
        else if( interaction.options.getSubcommand() === 'playing' )
        {
            yt_info = await play.video_info(global.songQueue.peek());
            videoTitle = yt_info.video_details.title;

            await interaction.reply( `${videoTitle} is currently playing.`)
        }
        else if( interaction.options.getSubcommand() === 'skip' )
        {
            player.stop(); //stop the audio player to make it go into the Idle status, and trigger the player.on event
            await interaction.reply( "Skipped song" );
        }
        else if( interaction.options.getSubcommand() === 'pause' )
        {
            player.pause();
            await interaction.reply( "Paused" );
        }
        else if( interaction.options.getSubcommand() === 'unpause' )
        {
            player.unpause();
            await interaction.reply( "Unpasued" );
        }
        else if( interaction.options.getSubcommand() === 'clear' )
        {
            global.songQueue.clear();
            await interaction.reply( "The song queue is cleared." );
        }
    },
}


player.addListener('stateChange', (oldOne, newOne) => {
    if( oldOne =='playing' && newOne.status == 'idle' )
    {
        console.log( 'The song finished' );
    }
});