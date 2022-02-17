const { SlashCommandBuilder } = require('@discordjs/builders');
// const { Users, CurrencyShop } = require('./dbObjects.js');
//const currency = require('../index.js');
const { Op } = require('sequelize');
const { Formatters } = require('discord.js');
const { currency } = require('../currency.js');
const { Users, CurrencyShop } = require('../dbObjects.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shop')
        .setDescription('Multiple commands for the currency shop.')
        .addSubcommand( subcommand =>
            subcommand
                .setName('getbalance')
                .setDescription('Get your currency balance'))
        .addSubcommand( subcommand => 
            subcommand
                .setName('myinventory')
                .setDescription('Show your inventory'))
        .addSubcommand( subcommand => 
            subcommand
                .setName('transfer')
                .setDescription('transfer some of your balance to another user')
                .addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(true))
                .addIntegerOption(option => option.setName('input').setDescription('How much to transfer?').setRequired(true)))
        .addSubcommand( subcommand =>
            subcommand
                .setName('buy')
                .setDescription('Buy an item from the shop')
                .addStringOption(option => option.setName('category').setDescription('Pick an item to buy').setRequired(true)
                .addChoice('Mushroom', 'Mushroom')
                .addChoice('Duel Glove', 'Duel Glove')))
        .addSubcommand( subcommand =>
            subcommand
                .setName('items')
                .setDescription('Display the shop'))
        /*.addSubcommand( subcommand =>
            subcommand
                .setName('leaderboard')
                .setDescription('Display the currency leaderboard'))*/,
    async execute(interaction) {
        if( interaction.options.getSubcommand() === 'getbalance' )
        {
            const target = await interaction.options.getUser('user') ?? interaction.user;

            await interaction.reply(`${interaction.user} has ${currency.getBalance(target.id)}`);
        }
        else if( interaction.options.getSubcommand() === 'myinventory' )
        {
            const target = interaction.options.getUser('user') ?? interaction.user;
            const user = await Users.findOne({ where: { user_id: target.id } });
            //console.log(user);
            const items = await user.getItems();

            if (!items.length) await interaction.reply(`${interaction.user} has nothing! What an idiot! :JLUL:`);

            else { await interaction.reply(`${interaction.user} currently has ${items.map(i => `${i.amount} ${i.item.name}`).join(', ')}`); }
        }
        else if( interaction.options.getSubcommand() === 'transfer' )
        {
            const currentAmount = currency.getBalance(interaction.user.id);
            const transferAmount = interaction.options.getInteger('input');
            const transferTarget = interaction.options.getUser('target');

            if (transferAmount > currentAmount) await interaction.reply(`Sorry ${interaction.user}, you only have ${currentAmount}.`);
            else if (transferAmount <= 0) await interaction.reply(`Please enter an amount greater than zero`);
            else
            {
                currency.add(interaction.user.id, -transferAmount);
                currency.add(transferTarget.id, transferAmount);
    
                await interaction.reply(`Successfully transferred ${transferAmount} to ${transferTarget.user}. Your current balance is ${currency.getBalance(interaction.user.id)}`);
            }

            /*currency.add(interaction.user.id, -transferAmount);
            currency.add(transferTarget.id, transferAmount);

            await interaction.reply(`Successfully transferred ${transferAmount} to ${transferTarget.user}. Your current balance is ${currency.getBalance(interaction.user.id)}`);*/
        }
        else if( interaction.options.getSubcommand() === 'buy' )
        {
            const itemName = interaction.options.getString('category');
            const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: itemName } } });

            if (!item) await interaction.reply('That item doesn\'t exist dummy');
            if (item.cost > currency.getBalance(interaction.user.id))
            {
                await interaction.reply(`You currently have ${currency.getBalance(interaction.user.id)}, but ${item.name} costs ${item.cost}! Go out and get some bones!`);
            }
            else
            {
                const user = await Users.findOne({ where: { user_id: interaction.user.id } });
                currency.add(interaction.user.id, -item.cost);
                await user.addItem(item);

                await interaction.reply (`You\'ve bought: ${item.name}.` );
            }

            /*const user = await Users.findOne({ where: { user_id: interaction.user.id } });
            currency.add(interaction.user.id, -item.cost);
            await user.addItem(item);

            await interaction.reply (`You\'ve bought: ${item.name}.` );*/
        }
        else if( interaction.options.getSubcommand() === 'items' )
        {
            const items = await CurrencyShop.findAll();
            await interaction.reply(Formatters.codeBlock(items.map(i => `${i.name}: ${i.cost}`).join('\n')));
        }
        /*else if( interaction.options.getSubcommand() === 'leaderboard' )
        {
            await interaction.reply(
                Formatters.codeBlock(
                    currency.sort((a, b) => b.balance - a.balance)
                    .filter(user => client.users.cache.has(user.user_id))
                    .first(10)
                    .map((user, position) => `(${position + 1}) ${(client.users.cache.get(user.user_id).tag)}: ${user.balance}`)
                    .join('\n'),
                ),
            );
        }*/
    },
}