const express = require('express');
const app = express();
const port = 3000;


const tasks = [
  {
    id: "1",
    isCompleted: false,
    description: "Hacer Tareas",
  },
  {
    id: "2",
    isCompleted: true,
    description: "Realizar los entregables",
  },
  {
    id: "3",
    isCompleted: false,
    description: "Estudiar",
  },
];


app.get('/', (req, res) => {
  res.json(tasks);
});


app.listen(port, () => {
  console.log(`Servidor Express corriendo en el puerto ${port}`);
});
