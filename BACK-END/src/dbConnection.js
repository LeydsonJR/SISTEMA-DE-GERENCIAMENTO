const pg = require('pg');
const { Pool, Client } = pg;

const pool = new Pool({
  user: 'postgres',
  password: 'root',
  host: '',
  port: 5432,
  database: 'Back-GEN',
});

const client = new Client({
  user: 'postgres',
  password: 'root',
  host: '',
  port: 5432,
  database: 'Back-GEN',
});

module.exports = {
  client,
  pool,
};
