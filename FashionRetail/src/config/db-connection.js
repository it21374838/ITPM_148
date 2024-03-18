const mongoose = require('mongoose');

const dbConnType = process.env.DB_CONN_TYPE;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const dbUrl = `${dbConnType}://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`;

module.exports = {
  connectToServer: async function (callback) {
    try {
      await mongoose.connect(dbUrl); // Connect to the database first
      callback();
    } catch (err) {
      callback(err);
    }
  },

  getDb: function () {
    return mongoose;
  },
};