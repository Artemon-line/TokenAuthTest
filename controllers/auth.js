const config = require('../config');
const bcrypt = require('bcrypt');
const authService = require('../services/auth');
const userService = require('../services/user');

function login(req, res) {


    let user = req.body;
    if (!user.email || !user.password) return res.status(400).send({
        success: false,
        message: 'Email or password isn\'t specified'
    });
    return authService.authenticate(req.body)
        .then(token => {
            res.send({
                success: true,
                token: token
            });
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: err.message
            });
        })
};

function register(req, res) {
    return userService.getUserByLogin(req.body.name, req.body.email)
        .then(exists => {

            if (exists) {
                return res.status(400).send({
                    success: false,
                    message: 'User with this name/email already registered.'
                });
            } else {

                var user = {
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, config.saltRounds)
                }



                return userService.addUser(user)
                    .then(() =>
                        authService.authenticate(user)
                        .then(token =>
                            res
                            .status(201)
                            .send({
                                success: true,
                                token: token
                            })))
            }

        }).catch(err => {
            res.status(500).send({
                success: false,
                message: err.message
            });
        });
};

module.exports = {
    login,
    register
}