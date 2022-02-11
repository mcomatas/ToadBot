const { SlashCommandBuilder } = require('@discordjs/builders');
// const { execute } = require('./board');
// My discord ID: 90603115727839232

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tags')
        .setDescription('Multiple commands involving tags for each user on the server.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('add a new tag'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('get')
                .setDescription('get a tag info'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('edit')
                .setDescription('edit a tag'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('info')
                .setDescription('get tag metadata'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('list all of the created tags'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('remove a tag')),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'add')
        {
            if (interaction.user.id != global.adminID)
            {
                await interaction.reply("You are not allowed to use this command, sorry bucko!");
            }
            else
            {
                await interaction.reply("Working on it!");
            }
        }
        else if (interaction.options.getSubcommand() === 'get')
        {
            const tagName = interaction.options.getString('name');

            const tag = await EventTargetShim.findOne({ where: {name: tagName } });

            if (tag)
            {
                tag.increment('usage_count');

                await interaction.reply(tag.get('description'));
            }

            await interaction.reply(`Could not find tag: ${tagName}`);
        }
        else if (interaction.options.getSubcommand() === 'edit')
        {
            interaction.reply("Working on it!");
        }
        else if (interaction.options.getSubcommand() === 'info')
        {
            interaction.reply("Working on it!");
        }
        else if (interaction.options.getSubcommand() === 'list')
        {
            const tagList = await Tags.findAll({ attributes: ['name'] });
            const tagString = tagList.map(t => t.name).join(', ') || 'No tags set.';

            return interaction.reply(`List of tags: ${tagString}`);
        }
        else if (interaction.options.getSubcommand() === 'remove')
        {
            interaction.reply("Working on it!");
        }
    },
}