const express = require('express');
const { supabase } = require('./supabaseClient'); 
const { Pool } = require('pg');

const app = express();
const port = 5000;


// PostgreSQL setup
const pool = new Pool({
  user: 'your-db-user',
  host: 'localhost',
  database: 'your-db-name',
  password: 'your-db-password',
  port: 5432,
});

app.use(express.json());
app.get('/api/check', async (req, res) => {
  res.send('API check!');
});

app.post('/api/scan', async (req, res) => {
  const { url } = req.body;
  // Placeholder for scanning functionality
  res.send(`Scanning URL: ${url}`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
