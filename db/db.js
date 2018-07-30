const config = require('../config');
const UserModel = require('../models/user');

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

const User = UserModel(sequelize, Sequelize);

const init = () => sequelize.sync({ force: true })
    .then(function(err) {
        console.log('Database synced');
    }, function(err) {
        console.log('An error occurred while syncing database:', err);
    });

module.exports = { User, init };