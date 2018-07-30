const jwt = require('jsonwebtoken');
const Users = require('../db/db').User;
const config = require('../config');

const authenticate = params => {
    return Users.findOne({
        where: {
            email: params.email
        },
        raw: true
    }).then(user => {
        if (!user)
            throw new Error('Authentication failed. User not found.');
        if (!params.password == user.password)
            throw new Error('Authentication failed. Wrong password.');
        const payload = {
            email: user.email,
            id: user.id,
            time: new Date()
        };

        var token = jwt.sign(payload, config.jwtSecret, {
            expiresIn: config.tokenExpireTime
        });
        return token;
    });
}

module.exports = {
    authenticate
}