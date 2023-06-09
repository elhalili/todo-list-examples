const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  // Finds the validation errors in this request 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}