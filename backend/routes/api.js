const express = require('express');
const tiApiController = require('../controllers/tiApiController');
const SB_controller = require('../supabaseClient')
const router = express.Router();

// GET Requests to retrieve data using the middleware routes

router.get('/test_get_data', SB_controller.get_data_test, (req, res) => {
  return res.status(200);
})

router.get('/coins', tiApiController.coinListMiddleware, (req, res) => {
  return res.status(200).json(res.locals);
});

router.get('/ratings', tiApiController.ratingListMiddleware, (req, res) => {
  return res.status(200).json(res.locals);
});

router.get('/completeCoin/:id', tiApiController.completeCoinMiddleware, (req, res) => {
  return res.status(200).json(res.locals.completeCoin);
});

router.get('/historyCoin/:id', tiApiController.historyCoinMiddleware, (req, res) => { // Updated to use dynamic middleware
  return res.status(200).json(res.locals);
});


module.exports = router;