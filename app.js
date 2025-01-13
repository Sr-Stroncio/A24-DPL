// 1. Instantiations
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bicicletasAPIRouter = require('./routes/api/bicicletas');
const favicon = require('serve-favicon');

// Configurations
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middlewares

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use('/api/bicicletas', bicicletasAPIRouter);

// Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Define the routes for the application
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Error Handling
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// Export
module.exports = app;
