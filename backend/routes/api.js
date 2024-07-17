const express = require('express');
const tiApiController = require('../controllers/tiApiController');
const router = express.Router();

// GET Requests to retrieve data using the middleware routes

router.get('/api/coins', tiApiController.coinListMiddleware, (req, res) => {
  return res.status(200).json(res.locals);
});

router.get('/api/ratings', tiApiController.ratingListMiddleware, (req, res) => {
  return res.status(200).json(res.locals);
});

router.get('/api/completeCoin/:id', tiApiController.completeCoinMiddleware, (req, res) => {
  return res.status(200).json(res.locals);
});

router.get('/api/historyCoin/:id', tiApiController.historyCoinMiddleware1d, (req, res) => {
  return res.status(200).json(res.locals);
});


module.exports = router;