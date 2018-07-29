const userService = require('../services/user');

function getUserProfile(req, res) {
    return userService.getUserByLogin(null, req.user.email)
        .then(user => res.send(user));
};

module.exports = {
    getUserProfile
}