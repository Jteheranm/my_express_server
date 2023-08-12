const express = require("express");

const app = express();
app.get("/", (req, res) => res.send("Hola mundo"));
app.get("/get-all-tasks", (req, res) =>
  res.json([
    {
      id: "123456",
      isCompleted: false,
      description: "Walk the dog",
    },
    {
      id: "412414",
      isCompleted: true,
      description: "Wash the car",
    },
    {
      id: "8834714",
      isCompleted: false,
      description: "Bring sugar",
    },
  ])
);
app.listen(80, () => console.log("Server ON"))

module.exports = app;
