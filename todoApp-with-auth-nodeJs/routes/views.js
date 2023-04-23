const { Router } = require('express');
const route = Router();

route.get('/login', (req, res) => {
  res.redirect('/');
});
route.get('/register', (req, res) => {
  res.redirect('/');
});

module.exports = route;