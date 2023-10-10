const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());

const tasks = [
  { id: 1, 
    title: 'Hacer los entregables', 
    completed: true},
  { id: 2, 
    title: 'Estudiar', 
    completed: false},
  { id: 3, 
    title: 'Ir de compras', 
    completed: true},
];

const errorHandler = (err, req, res, next) => {
  if(err instanceof SyntaxError && err.status === 400 && 'body' in err){
    res.status(400).json({error: 'Solicitud invalida'});
  }else{
    next();
  }
}


router.post('/create', errorHandler, (req, res) => {
  const newTask = req.body;
  newTask.id = tasks.length + 1;
  tasks.push(newTask);
  res.status(201).json({ message: 'Tarea creada' });
});

router.delete('/delete/:id', errorHandler, (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) {
    res.status(404).json({ error: 'Tarea no encontrada' });
  } else {
    tasks.splice(taskIndex, 1);
    res.json({ message: 'Tarea eliminada exitosamente' });
  }
});

router.put('/update/:id', (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) {
    res.status(404).json({ error: 'Tarea no encontrada' });
  } else {
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    res.json({ message: 'Tarea actualizada exitosamente' });
  }
});

module.exports = router;

