const router = require("express").Router();

// Crear tarea
router.post("/create-task", (req, res) => {
  // Verificar que se reciban los parámetros
  if (req.body.id === undefined) return res.send("Falta id");
  else if (req.body.isCompleted === undefined)
    return res.send("Falta isCompleted");
  else if (req.body.description === undefined)
    return res.send("Falta description");

  // Crear la tarea
  const allTasks = req.app.get("tasks");
  allTasks.push({
    id: req.body.id,
    isCompleted: req.body.isCompleted,
    description: req.body.description,
  });
  req.app.set("tasks", allTasks);

  res.send("Tarea creada");
});

// Eliminar tarea
router.delete("/delete-task", (req, res) => {
  // Verificar que se reciban los parámetros
  if (req.body.id === undefined) return res.send("Falta id");

  // Verificar si la tarea existe
  const taskExist = req.app
    .get("tasks")
    .find((task) => task.id === req.body.id);
  if (!taskExist) return res.send("La tarea no existe");

  // Eliminar la tarea
  const newTasks = req.app
    .get("tasks")
    .filter((task) => req.body.id !== task.id);
  req.app.set("tasks", newTasks);

  res.json(`La tarea con id ${req.body.id} fue eliminada`);
});

// Obtener todas las tareas que están incompletas
router.patch("/update-task", async (req, res) => {
  // Verificar que se reciban los parámetros
  if (req.body.id === undefined) return res.send("Falta id");
  else if (req.body.isCompleted === undefined)
    return res.send("Falta isCompleted");
  else if (req.body.description === undefined)
    return res.send("Falta description");

  // Verificar si la tarea existe
  const taskExist = req.app
    .get("tasks")
    .find((task) => task.id === req.body.id);
  if (!taskExist) return res.send("La tarea no existe");

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

  res.json(`La tarea con id ${req.body.id} fue modificada`);
});

module.exports = router;
