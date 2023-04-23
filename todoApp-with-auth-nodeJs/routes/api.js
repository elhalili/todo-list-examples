const authRoute = require('./auth');
const todoRoute = require('./todo');
const auth = require('../middlewares/auth');
const { Router } = require('express');
const route = Router();

route.use('/auth/', authRoute);
route.use('/todos/', auth, todoRoute);

module.exports = route;