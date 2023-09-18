const express = require('express');
const app = express();
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

app.use('/view', listViewRouter);
app.use('/edit', listEditRouter);

const port = 3000;

app.listen(port, () => {
  console.log(`Servidor Express corriendo en el puerto ${port}`);
});
