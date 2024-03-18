const Movies = require('../models/movies.model');

exports.getAll = async function(limit = 10) {
  try {
    return await Movies.find({}).limit(limit);
    // res.json(movies);
  } catch (error) {
    // res.status(500).json({ error: 'Error retrieving movies' });
    return Promise.reject(error);
  }
}
