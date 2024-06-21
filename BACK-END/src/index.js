const express = require('express');
const cors = require('cors');
const app = express();
const { client, pool } = require('./dbConnection');
app.use(express.json());
app.use(
  cors({
    origin: '*',
  }),
);

app.post('/api/login', async (req, res) => {
  return res.send('Hello world');
});

app.post('/api/schools', async (req, res) => {
  const { nome, endereco } = req.body;
  await pool.connect();
  await client.query('INSERT INTO escola (nome, endereco) VALUES ($1, $2)', [
    nome,
    endereco,
  ]);
  res.status(201).send();
});

app.post('/api/users', async (req, res) => {
  return res.send('Hello world');
});

app.post('/api/teachers', async (req, res) => {
  return res.send('Hello world');
});

app.post('/api/students', async (req, res) => {
  return res.send('Hello world');
});

app.listen(3000, () => {
  console.log('Server running at 30000');
});
