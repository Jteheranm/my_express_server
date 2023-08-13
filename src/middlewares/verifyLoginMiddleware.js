const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.get("Authorization");
  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    req.app.set("user", user);
    next();
  } catch (error) {
    res.json({ error });
  }
};
