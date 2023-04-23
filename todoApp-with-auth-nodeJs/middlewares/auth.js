module.exports = (req, res, next) => {
  if (req.session.auth) return next();

  res.status(403).json({
    error: 'Forbidden'
  });
}