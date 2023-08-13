const router = require("express").Router();
const { body } = require("express-validator");

// Middlewares
const { taskSchema, taskExists } = require("../middlewares/listEditMiddleware");
const throwErrorMiddleware = require("../middlewares/throwErrorMiddleware");
const verifyLoginMiddleware = require("../middlewares/verifyLoginMiddleware");

// Crear tarea
router.post(
  "/create-task",
  verifyLoginMiddleware,
  taskSchema,
  throwErrorMiddleware,
  (req, res) => {
    // Crear la tarea
    const allTasks = req.app.get("tasks");
    allTasks.push({
      id: req.body.id,
      isCompleted: req.body.isCompleted,
      description: req.body.description,
    });
    req.app.set("tasks", allTasks);

    res.status(201).send({ response: "Tarea creada" });
  }
);

// Eliminar tarea
router.delete(
  "/delete-task",
  verifyLoginMiddleware,
  body("id").isString(),
  body("id").custom(taskExists),
  throwErrorMiddleware,
  (req, res) => {
    // Eliminar la tarea
    const newTasks = req.app
      .get("tasks")
      .filter((task) => req.body.id !== task.id);
    req.app.set("tasks", newTasks);

    res
      .status(200)
      .json({ response: `La tarea con id ${req.body.id} fue eliminada` });
  }
);

// Obtener todas las tareas que están incompletas
router.patch(
  "/update-task",
  verifyLoginMiddleware,
  taskSchema,
  body("id").custom(taskExists),
  throwErrorMiddleware,
  async (req, res) => {
    // Modificar la tarea
    const allTasks = req.app.get("tasks").map((task) => {
      return task.id === req.body.id
        ? {
            id: req.body.id,
            isCompleted: req.body.isCompleted,
            description: req.body.description,
          }
        : task;
    });
    req.app.set("tasks", allTasks);

    res
      .status(201)
      .json({ response: `La tarea con id ${req.body.id} fue modificada` });
  }
);

module.exports = router;
