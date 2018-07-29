const sequelize = require('../db/db');
const Sequelize = require('sequelize');

sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    }, function(err) {
        console.log('Unable to connect to the database:', err);
    });

let User = sequelize.define('User', {
    name: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING
});

//  SYNC SCHEMA
sequelize
    .sync({ force: true })
    .then(function(err) {
        console.log('It worked!');
    }, function(err) {
        console.log('An error occurred while creating the table:', err);
    });


module.exports = {
    User
}