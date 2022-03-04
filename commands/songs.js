const { SlashCommandBuilder } = require('@discordjs/builders');
const ytdl = require('ytdl-core');
const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
} = require('@discordjs/voice');
//const { lib } = require('lib');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('songs')
        .setDescription('Commands to play or add songs from YouTube.')
        .addSubcommand( subcommand =>
            subcommand
                .setName('play')
                .setDescription('Play a with a YouTube url')
                .addStringOption(option => option.setName('input').setDescription('Give a YouTube URL').setRequired(true)))
        .addSubcommand( subcommand =>
            subcommand
                .setName('join')
                .setDescription('Make ToadBot join the voice channel')),
    async execute(interaction) {
        
        let VOICE_CHANNEL = '660535406382678020'

        if(interaction.options.getSubcommand() === 'play')
        {
            
            let youtubeLink = interaction.options.getString('input');
            
            const vc = interaction.member.voice.channel;
            if( !vc ) await interaction.reply( "You need to be in a voice channel to execute this command" );
            else 
            { 
                //console.log( vc.id );
                //console.log( interaction.guildId );
            //await interaction.reply("Working on it"); 
                const connection = joinVoiceChannel({
                    channelId: vc.id,
                    guildId: interaction.guildId,
                    adapterCreator: interaction.guild.voiceAdapterCreator,
                });

                //console.log(youtubeLink);

                const stream = ytdl(youtubeLink, { filter: 'audioonly' });
                const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
                const player = createAudioPlayer();
                
                player.play(resource);
                connection.subscribe(player);
                
                player.on(AudioPlayerStatus.Idle, () => connection.destroy());

                await interaction.reply( "Now playing a song!" );
            }
            //const connection = await vc.join();
            
            /*const connection = joinVoiceChannel({
                channelId: interaction.channel.id,
                guildId: interaction.channel.guild.id,
                adapterCreator: interaction.channel.guild.voiceAdapterCreator,
            });*/
            
            /*const stream = ytdl(youtubeLink, { filter: 'audioonly' });
            const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
            const player = createAudioPlayer();
            
            player.play(resource);
            connection.subscribe(player);
            
            player.on(AudioPlayerStatus.Idle, () => connection.destroy());*/
            
            
            /*try
            {
                let youtubeLink = interaction.options.getString('input');

                let downloadInfo = await ytdl.getInfo(youtubeLink);
                await lib.discord.voice['@0.0.1'].tracks.play({
                    channel_id: `${VOICE_CHANNEL}`,
                    guild_id: `${context.params.even.guild_id}`,
                    download_info: downloadInfo
                });
            }
            catch ( e )
            {
                console.log(e);
                await interaction.reply( 'Failed to play track' );
            }*/
            
        }
        else if(interaction.options.getSubcommand() === 'join' )
        {
            /*let url = interaction.options.getString('input');

            if( ytdl.validateURL(url) )
            {
                console.log("This is a valid URL!");
            }*/
            
            await interaction.reply('Working on it');
        }


    },
}