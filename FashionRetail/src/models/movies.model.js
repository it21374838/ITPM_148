const mongoose = require('mongoose');

const collectionName = 'movies';
const moviesSchema = new mongoose.Schema({
  plot: String,
  genres: [String],
  runtime: Number,
  cast: [String],
  poster: String,
  title: String,
  fullplot: String,
  languages: [String],
  released: Date,
  directors: [String],
  rated: String,
  awards: Object,
  lastupdated: Date,
  year: Number,
  imdb: Object,
  countries: [String],
  type: String,
  tomatoes: Object,
  fresh: Number,
  rotten: Number,
  num_mflix_comments: Number,
});

// Optional: Create custom methods for your model
// movieSchema.methods.someCustomMethod = function() {
//   // Implement your custom logic here
// };

module.exports = mongoose.model(collectionName, moviesSchema);