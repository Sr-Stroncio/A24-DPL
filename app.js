// 1. Instantiations
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bicicletasAPIRouter = require('./routes/api/bicicletas');
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");
const favicon = require('serve-favicon');
var cors = require('cors');

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
app.use(cors({
  origin: "http://localhost:8080",
  methods: "GET, PUT, POST",
  allowedHeaders: "Content-Type,Authorization"
}));

// Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Define the routes for the application
app.use('/', indexRouter);
app.use('/users', usersRouter);

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/api/*.js", "./models/*.js", "./controllers/api/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);



// Error Handling
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// Export
module.exports = app;
