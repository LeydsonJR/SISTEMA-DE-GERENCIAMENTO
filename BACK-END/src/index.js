const express = require('express');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
const { client, pool } = require('./dbConnection');
app.use(express.json());
app.use(
  cors({
    origin: '*',
  }),
);

app.post('/api/login', async (req, res) => {
  const { login, senha, tabela } = req.body;
  await pool.connect();
  const user = pool.query(
    `SELECT * FROM  ${client.escapeIdentifier(tabela)}
  WHERE login = $1 AND senha = $2`[(login, senha)],
  );
  if (!user) {
    return res.status(400).send('User not found.');
  }
});

app.post('/api/schools', async (req, res) => {
  const { nome, endereco } = req.body;
  try {
    await pool.query('INSERT INTO escola (nome, endereco) VALUES ($1, $2)', [
      nome,
      endereco,
    ]);
    res.status(201).send({ message: 'School created successfully' });
  } catch (error) {
    console.error('Error creating school:', error);
    res.status(500).send({ error: 'Error creating school' });
  }
});

app.get('/api/school-list', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, nome, endereco FROM escola');
    res.status(200).send(result.rows);
  } catch (error) {
    console.error('Error fetching school list:', error);
    res.status(500).send({ error: 'Error fetching school list' });
  }
});

app.post('/api/teachers', async (req, res) => {
  const { nome, cpf, senha, data_nascimento, school_id } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(senha, 10);
    await pool.query('BEGIN');
    const insertTeacherQuery = `
      INSERT INTO professor (cpf, nome, senha, data_nascimento, escola_id)
      VALUES ($1, $2, $3, $4, $5) RETURNING *
    `;
    await pool.query(insertTeacherQuery, [
      cpf,
      nome,
      hashedPassword,
      data_nascimento,
      school_id,
    ]);
    await pool.query('COMMIT');
    res.status(201).send({ message: 'Teacher created successfully' });
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Erro ao criar professor:', error);
    res.status(500).send({ error: 'Error creating Teacher' });
  }
});

app.get('/api/teachers-list', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM professor');
    res.status(200).send(result.rows);
  } catch (error) {
    console.error('Error fetching school list:', error);
    res.status(500).send({ error: 'Error fetching school list' });
  }
});

app.post('/api/students', async (req, res) => {
  const { nome, cpf, data_nascimento, professor_cpf, senha } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(senha, 10);
    await pool.query('BEGIN');
    const insertStudentQuery = `
      INSERT INTO aluno (nome, cpf, data_nascimento, professor_cpf, senha)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await pool.query(insertStudentQuery, [
      nome,
      cpf,
      data_nascimento,
      professor_cpf,
      hashedPassword,
    ]);
    await pool.query('COMMIT');
    res.status(201).send(result.rows[0]);
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Error adding student:', error);
    res.status(500).send({ error: 'Error adding student' });
  }
});

app.listen(3000, () => {
  console.log('Server running at 30000');
});
