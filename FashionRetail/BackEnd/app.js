var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dbo = require('./src/config/db-connection');

var indexRouter = require('./src/routes/index');
var userRouter = require('./src/routes/User.route');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/User',userRouter);


dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }
  console.log('Connected to the database');
})


module.exports = app;
