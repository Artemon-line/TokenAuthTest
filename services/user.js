const Users = require('../db/db').User;
const Op = require('sequelize').Op;

function addUser(user) { return Users.create(user) };

function getUserByLogin(name, email) {

    return Users.findOne({
        where: {
            [Op.or]: [{ name }, { email }]
        }
    });
}

module.exports = {
    addUser,
    getUserByLogin
}