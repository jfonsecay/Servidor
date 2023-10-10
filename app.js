const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
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
app.use(express.json());
app.use(cors());
app.use(validate)

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '15m' });
  res.json({ token });
});

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token no válido' });
    }
    req.user = user;
    next();
  });
}

app.get('/ruta-protegida', authenticateToken, (req, res) => {
  res.json({ message: 'Ruta protegida' });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server on ${port}`);
});
