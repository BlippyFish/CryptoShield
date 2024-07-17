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
    return next({
      log: 'Express error handler caught error in completeCoinMiddleware',
      status: 500,
      message: { err: 'An error occurred' }
    });
  }
};

// middleware to a single coin's historical price data from TI API when coin ID is input through front end
tiApiController.historyCoinMiddleware1d = async (req, res, next) => {
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

module.exports = tiApiController;