const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/login', async (req, res) => {
  return res.send('Hello world');
});

app.post('/api/users', async (req, res) => {
  return res.send('Hello world');
});

app.post('/api/schools', async (req, res) => {
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
