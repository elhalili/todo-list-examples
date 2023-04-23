const { login, register, isConnected, logout } = require('../controllers/AuthController');
const { Router } = require('express');
const auth = require('../middlewares/auth');
const route = Router();

route.get('/isConnected', ...isConnected);
route.post('/login', ...login);
route.post('/register', ...register);
route.post('/logout', auth, ...logout)

module.exports = route;