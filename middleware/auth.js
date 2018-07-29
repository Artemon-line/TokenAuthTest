'use strict'

const jwt = require('jsonwebtoken');
const config = require('../config');

const checkAuth = (req, res, next) => {
    if (!req.token)
        return res.status(401).send({ auth: false, message: 'Token is not specified.' });

    jwt.verify(req.token, config.jwtSecret, (err, decoded) => {
        if (err)
            return res.status(403).send({ auth: false, message: 'Failed to authenticate token.' });

        req.user = {
            email: decoded.email,
            id: decoded.id
        };
        next();
    });
}

module.exports = {
    checkAuth
}