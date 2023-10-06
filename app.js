const express = require('express');
const app = express();
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

const validate = (req, res, next) => {
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
  if(!allowedMethods.includes(req.method)){
    return res.status(405).json({error: 'Metodo no valido'})
  }
  next();
}

app.use('/view', listViewRouter);
app.use('/edit', listEditRouter);
app.use(cors());
app.use(validate)

const port = 3000;

app.listen(port, () => {
  console.log(`Server on ${port}`);
});
