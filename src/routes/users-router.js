const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { body } = require("express-validator");

// Middlewares
const verifyLoginMiddleware = require("../middlewares/verifyLoginMiddleware");
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
    res.json({ token });
  }
);

router.get("/get-user", verifyLoginMiddleware, (req, res) => {
  const userData = {
    email: req.app.get("user").email,
    name: req.app.get("user").name,
    rol: req.app.get("user").rol,
  };
  res.json(userData);
});

module.exports = router;
