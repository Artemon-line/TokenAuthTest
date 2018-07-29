const authController = require('./auth');
const userController = require('./user');
const authMiddleware = require('../middleware/auth');

module.exports.set = (app) => {
    app.post('/api/login', authController.login);
    app.post('/api/register', authController.register);
    app.get('/api/profile', authMiddleware.checkAuth, userController.getUserProfile)
}