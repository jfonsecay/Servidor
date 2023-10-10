const express = require('express');
const router = express.Router();

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

const manage = (req, res, next) => {
  const {params1, params2} = req.params
  if(!params1 || !params2){
    res.status(405).json({error: 'parametros erroneos'})
  }
  next();
}

router.get('/completed', manage, (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    res.status(404).json({ error: 'Tarea no encontrada' });
  } else {
    res.json(task);
  }
});

router.get('/incomplete', manage, (req, res) => {
  const incompleteTasks = tasks.filter(task => !task.completed);
  res.json(incompleteTasks);
});

module.exports = router;
