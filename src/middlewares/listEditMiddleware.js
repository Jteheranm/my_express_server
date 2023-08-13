const { checkSchema } = require('express-validator');

module.exports = {
  taskSchema: checkSchema({
    id: {
      errorMessage: 'Se debe enviar el id y debe ser un string',
      isString: true,
    },
    isCompleted: {
      errorMessage: 'Se debe enviar el isCompleted y debe ser un booleano',
      isBoolean: true,
    },
    description: {
      errorMessage: 'Se debe enviar la description y debe ser un string',
      isString: true,
    },
  }),
  taskExists: (id, { req }) => {
    // Verificar si la tarea existe
    const taskExist = req.app
      .get("tasks")
      .find((task) => task.id === id);
    if (!taskExist) throw new Error('Task does not exists');
    return true
  },
};
