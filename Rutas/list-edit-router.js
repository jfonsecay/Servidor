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
  tasks.push(newTask);
  res.json(newTask);
});

router.delete('/delete/:id', errorHandler, (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === taskId);
  if (index !== -1) {
    tasks.splice(index, 1);
    res.json({ message: 'Tarea eliminada con éxito' });
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

router.put('/update/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body; 
  const index = tasks.findIndex(task => task.id === taskId);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
    res.json(tasks[index]);
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

module.exports = router;

