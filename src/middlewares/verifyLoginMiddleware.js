const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token = req.get("Authorization");
    const user = jwt.verify(token, process.env.SECRET_KEY);
    req.app.set("user", user);
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
