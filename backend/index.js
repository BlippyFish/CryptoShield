const path = require('path');
const axios = require('axios').default;
const express = require('express');
const { supabase } = require('./supabaseClient');
const { Pool } = require('pg');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();
const PORT = 8080;

const apiPath = path.join(__dirname, '/routes/api.js');
const routerAPI = require(apiPath);

// const dbFunctionality = () => {
//   // Supabase setup
//   const supabaseUrl = 'https://your-supabase-url.supabase.co';
//   const supabaseKey = 'your-supabase-anon-key';
//   const supabase = createClient(supabaseUrl, supabaseKey);

//   // PostgreSQL setup
//   const pool = new Pool({
//     user: 'your-db-user',
//     host: 'localhost',
//     database: 'your-db-name',
//     password: 'your-db-password',
//     port: 5432,
//   });
// };



app.use(express.json());

// CORS middleware options
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

// enable CORS for all routes
app.use(cors());

// route handler for requests to /api
app.use('/api', routerAPI);

// Unknown route handler
app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log('errorObj.log: ', errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});