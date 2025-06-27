var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var transactionRouter = require('./routes/transaction');
var app = express();
var errorHandler = require('./middlewares/errorHandler');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/transaction', transactionRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(errorHandler);

module.exports = app;
