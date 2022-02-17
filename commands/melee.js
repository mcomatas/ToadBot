const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('melee')
        .setDescription('Get slippi codes or random melee teams')
        .addSubcommand(subcommand =>
            subcommand
                .setName('teams')
                .setDescription('Get random melee teams'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('codes')
                .setDescription('Get the slippi codes of everyone')),
    async execute(interaction) {
        if( interaction.options.getSubcommand() === 'teams' )
        {
            const rand = Math.floor(Math.random() * 3);

            if( rand === 0 )
            {
                await interaction.reply("Melee Teams:\nTeam 1: William & Michael\nTeam 2: Erick & Christopher");
            }
            else if( rand === 1 )
            {
                await interaction.reply("Melee Teams:\nTeam 1: William & Erick\nTeam 2: Christopher & Michael");
            }
            else if( rand === 2 )
            {
                await interaction.reply("Melee Teams:\nTeam 1: William & Christopher\nTeam 2: Erick & Michael");
            }
        }
        else if( interaction.options.getSubcommand() === 'codes' )
        {
            await interaction.reply('Slippi codes:\nMichael: TALM#723\nWilliam: SMIL#255\nChristopher: KRUS#702\nErick: Doesn\'t have one :(');
        }
    },
}