const { SlashCommandBuilder } = require('@discordjs/builders');
const { Users, CurrencyShop } = require('../dbObjects.js');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

const UserItems = require('../models/userItems.js')(sequelize, Sequelize.DataTypes);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('duel')
        .setDescription('Choose a player to duel, to settle a debate.')
        .addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(true)),
    async execute(interaction) {

        const target = interaction.options.getUser('user') ?? interaction.user;
        const user = await Users.findOne({ where: { user_id: target.id } });
        const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: 'Duel Glove' } } }); //this is the duel glove item

        const userItem = await UserItems.findOne({
            where: { user_id: target.id, item_id: item.id },
        }); //this gets the duel glove item attached to the user using the command

        //console.log( Reflect.ownKeys(userItem.dataValues));
        //console.log( Reflect.get(userItem.dataValues, amount));
        //console.log( userItem.dataValues.amount );
        
        if( userItem.dataValues.amount <= 0 )//if the user has less than or equal to 0 duel gloves they can't use the command
        {
            await interaction.reply( 'This guy tried to duel without a Duel Glove! What an idiot! :goobs: :JLUL:' );
        }
        else
        {
            const duelee = interaction.options.getUser('target');
        
            if( interaction.user.id === duelee.id )
            {
                await interaction.reply( 'You can\'t duel yourself dummy!' );
            }
            else
            {
                await interaction.reply(`Duel has started between ${interaction.user} and ${duelee}!`);
                
                    /*await interaction.followUp('3...');
                    setTimeout(function() {
                        interaction.followUp('2...');
                    }, 1000 );
                    setTimeout(function() {
                        interaction.followUp('1...');
                    }, 2000 );*/ //this sent 3 messages, I am commenting it out to make ToadBot not spam as much

                setTimeout(async function() {
                    const rand = Math.floor(Math.random() * 2);
                    if( rand === 0 )
                    {
                        await interaction.followUp(`The winner is ${interaction.user}!`);
                    }
                    else if( rand === 1 )
                    {
                        await interaction.followUp(`The winner is ${duelee}!`);
                    }
                }, 3000 );
            }
            await user.deleteItem(item);
        }
    },
};