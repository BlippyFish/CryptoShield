const path = require('path');
const axios = require('axios').default;
const express = require('express');
const { supabase } = require('./supabaseClient');
const { Pool } = require('pg');
const cors = require('cors');
const dotenv = require('dotenv').config();         

const app = express();
const PORT = 8080;

  
  // PostgreSQL setup
  const pool = new Pool({
    user: 'your-db-user',
    host: 'localhost',
    database: 'your-db-name',
    password: 'your-db-password',
    port: 5432,
  });




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
    headers: {accept: 'application/json', TI_API_KEY: 'c8c0fd6ddc4f487291887853c5a5dc92'}
  };

  axios
    .request(options)
    .then(function (response) {
      res.locals.coinList = response.data;
      console.log('res.locals: ', res.locals);
      return next();
    })
    .catch(function (error) {
      return next({
        log: 'Express error handler caught error in coinListMiddleware',
        status: 500,
        message: { err: 'An error occurred' }
      })
    });
};

// middleware to retrieve rating list from TI API
const ratingListMiddleware = (req, res, next) => {
  const options = {
    method: 'GET',
    url: 'https://api.tokeninsight.com/api/v1/rating/coins',
    headers: {accept: 'application/json', TI_API_KEY: 'c8c0fd6ddc4f487291887853c5a5dc92'}
  };
  
  axios
    .request(options)
    .then(function (response) {
      res.locals = response.data;
      console.log('res.locals: ', res.locals);
      return next();
    })
    .catch(function (error) {
      return next({
        log: 'Express error handler caught error in ratingListMiddleware',
        status: 500,
        message: { err: 'An error occurred' }
      })
    });
};

// middleware to retrieve a single coin's complete data from TI API when coin ID is inputted through frontend react component
const completeCoinMiddleware = (req, res, next) => {
  
  const { idCoin } = req.params;

  const options = {
    method: 'GET',
    url: `https://api.tokeninsight.com/api/v1/coins/${idCoin}`, // this URL may need to get re-written - may need to drop the "/id" part
    headers: {accept: 'application/json', TI_API_KEY: 'API_GOES_HERE'},
  };


    // check if the ID is of the correct type of string - if not, throw an error

  axios
  .request(options)
  .then(function (response) {
    res.locals = response.data;
    console.log('res.locals: ', res.locals);
    return next();
  })
  .catch(function (error) {
    return next({
      log: 'Express error handler caught error in completeCoinMiddleware',
      status: 500,
      message: { err: 'An error occurred' }
    })
  });
    
//NEED HANDOFF CODE FOR FRONTEND TO PASS IN COIN ID
// TokenInsight's endpoint looks like this - https://api.tokeninsight.com/api/v1/coins/{id}
// need to figure out a way to pass in an ID from the req.params

};

//GET Requests to retrieve data using the middleware routes
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
