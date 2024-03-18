var express = require('express');
var router = express.Router();

const moviesController = require('../controllers/movies.controller');

router.get('/', async function (req, res, next) {
  try {
    const movies = await moviesController.getAll();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving movies' });
  }
});

module.exports = router;
