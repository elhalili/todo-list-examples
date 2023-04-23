const { body } = require('express-validator');

module.exports.registerValidator = [
  body('email').isEmail(),
  body('password').isLength({min: 8}),
  body('fullName').isLength({min: 1})
];

module.exports.loginValidator = [
  (req, res, next) => { console.log(req.body); next() },
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
];