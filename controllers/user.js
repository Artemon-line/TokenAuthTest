const userService = require('../services/user');

function getUserProfile(req, res) {
    return userService
        .getUserByLogin(null, req.user.email)
        .then(user => {
            if (!user) {
                return res
                    .status(400).send({
                        success: false,
                        message: 'User with this email not registered.'
                    });
            }

            return res.status(200).send({
                id: user.id,
                name: user.name,
                email: user.email
            });
        })

    .catch(err => {
        return res.status(500).send({
            success: false,
            message: err.message
        });
    })
};

module.exports = {
    getUserProfile
}