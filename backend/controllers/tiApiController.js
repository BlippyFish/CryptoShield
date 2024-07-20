const axios = require('axios').default;

const tiApiController = {};

// middleware to retrieve coin list from TI API
tiApiController.coinListMiddleware = async (req, res, next) => {
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
    console.error('Error fetching coin list:', error.response ? error.response.data : error.message);
    return next({
      log: 'Express error handler caught error in coinListMiddleware',
      status: 500,
      message: { err: 'An error occurred' }
    });
  }
};

// middleware to retrieve rating list from TI API
tiApiController.ratingListMiddleware = async (req, res, next) => {
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
    console.error('Error fetching rating list:', error.response ? error.response.data : error.message);
    return next({
      log: 'Express error handler caught error in ratingListMiddleware',
      status: 500,
      message: { err: 'An error occurred' }
    });
  }
};

// middleware to retrieve a single coin's complete data from TI API when coin ID is input through front end
tiApiController.completeCoinMiddleware = async (req, res, next) => {
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
    console.error(`Error fetching complete data for coin ${id}:`, error.response ? error.response.data : error.message);
    return next({
      log: 'Express error handler caught error in completeCoinMiddleware',
      status: 500,
      message: { err: error.response ? error.response.data : error.message }
    });
  }
};

// middleware to a single coin's historical price data from TI API when coin ID is input through front end
tiApiController.historyCoinMiddleware = async (req, res, next) => { // rename variable to reflect we aren't just fetching for 1d
  const { id } = req.params;
  const { interval, length } = req.query; // Get interval and length from query parameters


  const options = {
    method: 'GET',
    url: `https://api.tokeninsight.com/api/v1/history/coins/${id}?interval=${interval}&length=${length}`, // Construct URL dynamically
    headers: { accept: 'application/json', TI_API_KEY: 'c8c0fd6ddc4f487291887853c5a5dc92' },
  };

  try {
    const response = await axios.request(options);
    response.data.data.market_chart.reverse();
    res.locals = response.data.data;
    console.log('res.locals: ', res.locals);
    return next();
  }
  catch (error) {
    console.error(`Error fetching historical data for coin ${id}:`, error.response ? error.response.data : error.message);
    return next({
      log: 'Express error handler caught error in historyCoinMiddleware',
      status: 500,
      message: { err: 'An error occurred' }
    });
  }
};

module.exports = tiApiController;
