const path = require('path');
const axios = require('axios').default;
const express = require('express');
const { supabase } = require('./supabaseClient');
const { Pool } = require('pg');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();
const PORT = 8080;

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


// middleware to retrieve coin list from TI API
const coinListMiddleware = async (req, res, next) => {
  const options = {
    method: 'GET',
    url: 'https://api.tokeninsight.com/api/v1/coins/list',
    headers: { accept: 'application/json', TI_API_KEY: 'c8c0fd6ddc4f487291887853c5a5dc92' }
  };

  try {
    const response = await axios.request(options);
    res.locals.coinList = response.data;
    console.log('res.locals: ', res.locals);
    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught error in coinListMiddleware',
      status: 500,
      message: { err: 'An error occurred' }
    });
  }
};


// middleware to retrieve rating list from TI API
const ratingListMiddleware = async (req, res, next) => {
  const options = {
    method: 'GET',
    url: 'https://api.tokeninsight.com/api/v1/rating/coins',
    headers: { accept: 'application/json', TI_API_KEY: 'c8c0fd6ddc4f487291887853c5a5dc92' }
  };

  try {
    const response = await axios.request(options);
    res.locals.ratingList = response.data; // Updated to properly store in res.locals.ratingList
    console.log('res.locals: ', res.locals);
    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught error in ratingListMiddleware',
      status: 500,
      message: { err: 'An error occurred' }
    });
  }
};
// middleware to retrieve a single coin's complete data from TI API when coin ID is inputted through frontend react component
const completeCoinMiddleware = async (req, res, next) => {
  // destructure id from req.params    
  const { id } = req.params;
  /* req.params.id is a string, not an object with an idCoin prop. 
  see line 95 below for reference
  */
  
  const options = {
    method: 'GET',
    url: `https://api.tokeninsight.com/api/v1/coins/${id}`, // use the destructured id
    headers: { accept: 'application/json', TI_API_KEY: 'c8c0fd6ddc4f487291887853c5a5dc92' },
  };

  try {
    const response = await axios.request(options);
    res.locals.completeCoin = response.data; // Updated to properly store in res.locals.completeCoin
    console.log('res.locals: ', res.locals);
    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught error in completeCoinMiddleware',
      status: 500,
      message: { err: 'An error occurred' }
    });
  }
};

const historyCoinMiddleware1d = async (req, res, next) => {
  const { id } = req.params;

  const options = {
    method: 'GET',
    url: `https://api.tokeninsight.com/api/v1/history/coins/${id}?interval=hour&length=24`,
    headers: { accept: 'application/json', TI_API_KEY: 'c8c0fd6ddc4f487291887853c5a5dc92' },
  };

  try {
    const response = await axios.request(options);
    res.locals.historyCoin1d = response.data.data.market_chart;
    
    console.log('res.locals: ', res.locals);
    return next();
  }
  catch (error) {
    return next({
      log: 'Express error handler caught error in historyCoinMiddleware1d',
      status: 500,
      message: { err: 'An error occurred' }
    });
  }

};






//GET Requests to retrieve data using the middleware routes

app.get('/api/historyCoin/:id', historyCoinMiddleware1d, (req, res) => {
  return res.status(200).json(res.locals);
});


app.get('/api/completeCoin/:id', completeCoinMiddleware, (req, res) => {
  return res.status(200).json(res.locals);
});

app.get('/api/coins', coinListMiddleware, (req, res) => {
  return res.status(200).json(res.locals);
});

app.get('/api/ratings', ratingListMiddleware, (req, res) => {
  return res.status(200).json(res.locals);
});

// insert middleware into the above that fires a GET request to the Tokeninsight API and returns a JSON response to the client
// start small in terms of how much data to retrieve from TI API.  start with retrieving a basic spread of data for their most popular coin (Bitcoin?)
// set query params: offset = 0, limit = 1


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