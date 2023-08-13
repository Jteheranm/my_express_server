const { validationResult } = require("express-validator");

module.exports = function (req, res, next) {
  // Lanzar error si hay
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  // Continuar si no hay error
  next()
}