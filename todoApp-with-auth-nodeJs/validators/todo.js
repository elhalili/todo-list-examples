const { body } = require('express-validator');

module.exports = [
  body('title').isLength({min: 1, max: 255}),
  body('isCompleted').isBoolean(),
];