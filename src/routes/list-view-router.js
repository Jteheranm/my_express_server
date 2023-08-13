const router = require("express").Router();

// Obtener todas las tareas
router.get("/get-all-tasks", (req, res) => res.json(req.app.get("tasks")));

// Obtener todas las tareas que están completas
router.get("/get-completed-tasks", (req, res) => {
  const completedTasks = req.app
    .get("tasks")
    .filter((task) => task.isCompleted);
  res.json(completedTasks);
});

// Obtener todas las tareas que están incompletas
router.get("/get-uncompleted-tasks", (req, res) => {
  const uncompletedTasks = req.app
    .get("tasks")
    .filter((task) => !task.isCompleted);
  res.json(uncompletedTasks);
});

module.exports = router;
