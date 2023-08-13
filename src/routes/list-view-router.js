const router = require("express").Router();
const { query } = require("express-validator");

// Middlewares
const {  taskExists } = require("../middlewares/listEditMiddleware");
const verifyLoginMiddleware = require("../middlewares/verifyLoginMiddleware");
const throwErrorMiddleware = require("../middlewares/throwErrorMiddleware");

// Obtener todas las tareas
router.get("/get-all-tasks", verifyLoginMiddleware, (req, res) =>
  res.status(200).json(req.app.get("tasks"))
);

// Obtener todas las tareas que están completas
router.get("/get-completed-tasks", verifyLoginMiddleware, (req, res) => {
  const completedTasks = req.app
    .get("tasks")
    .filter((task) => task.isCompleted);
  res.status(200).json(completedTasks);
});

// Obtener todas las tareas que están incompletas
router.get("/get-uncompleted-tasks", verifyLoginMiddleware, (req, res) => {
  const uncompletedTasks = req.app
    .get("tasks")
    .filter((task) => !task.isCompleted);
  res.status(200).json(uncompletedTasks);
});

// Obtener una tarea en específico
router.get(
  "/get-one-task:id",
  verifyLoginMiddleware,
  query("id").isString(),
  query("id").custom(taskExists),
  throwErrorMiddleware,
  (req, res) => {
    const task = req.app.get("tasks").find((task) => task.id === req.query.id);
    res.status(200).json(task);
  }
);

module.exports = router;
