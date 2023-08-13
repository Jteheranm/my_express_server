const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { body } = require("express-validator");

// Middlewares
const throwErrorMiddleware = require("../middlewares/throwErrorMiddleware");

// Login
router.post(
  "/login",
  body("email").isString(),
  body("password").isString(),
  throwErrorMiddleware,
  (req, res) => {
    const users = req.app.get("users");

    const email = req.body?.email ?? "";
    const password = req.body?.password ?? "";

    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (!user)
      return res.status(401).send({ error: "Invalid email or password" });

    const token = jwt.sign(user, process.env.SECRET_KEY, {
      algorithm: "HS256",
    });
    res.status(200).json({ token });
  }
);

module.exports = router;
