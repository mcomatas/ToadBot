const Sequelize = require('sequelize');

const sequlize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

const CurrencyShop = require('./models/currencyShop.js')(sequelize, Sequelize.DataTypes);
require('./models/users.js')(sequelize, Sequelize.DataTypes);
require('./models/userItems.js')(sequlize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
    const shop = [
        CurrencyShop.upsert({ name: 'Mushroom', cost: 1 }),
        CurrencyShop.upsert({ name: 'Duel Glove', cost: 2 }),
    ];

    await Promise.all(shop);
    console.log('Database Synced');

    sequelize.close();
}).catch(console.error);