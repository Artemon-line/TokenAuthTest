// const Sequelize = require('sequelize');
// var sequelize = new Sequelize(require('./config').dbConnectionString);
// require('sequelize-values')(sequelize);

// module.exports = sequelize;

const config = require('../config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.dbName, 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    // SQLite only
    storage: './database.sqlite'
});

require('sequelize-values')(sequelize);

module.exports = sequelize;