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


router.get('/completed', (req, res) => {
  const completedTasks = tasks.filter(task => task.completed);
  res.json(completedTasks);
});

router.get('/incomplete', (req, res) => {
  const incompleteTasks = tasks.filter(task => !task.completed);
  res.json(incompleteTasks);
});

module.exports = router;
