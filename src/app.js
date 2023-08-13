const express = require("express");
const dotenv = require("dotenv");

// Iniciar dotenv
dotenv.config();

// Rutas
const listViewRouter = require("./routes/list-view-router");
const listEditRouter = require("./routes/list-edit-router");
const usersRouter = require("./routes/users-router");

const app = express();

// Middleware para solo recibir peticiones en los métodos permitidos
app.use((req, res, next) => {
  if (!/^(GET|PUT|POST|DELETE|PATCH)$/.test(req.method)) {
    res.status(400).send("bad request");
    return;
  }
  next();
});

// Para recibir el .body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lista de tareas
app.set("tasks", [
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
]);

// Lista de usuarios
app.set("users", [
  {
    email: "admin@example.com",
    name: "admin",
    password: "123456admin",
  },
  {
    email: "user@example.com",
    name: "user",
    password: "123456user",
  },
]);

// Listar tareas
app.use("/", listViewRouter);

// Modificar tareas
app.use("/", listEditRouter);

// Manejo de usuarios
app.use("/", usersRouter);

app.get("/", (req, res) => res.send("Hola mundo"));
app.listen(80, () => console.log("Server ON"));

module.exports = app;
