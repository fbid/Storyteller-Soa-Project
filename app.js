var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var helmet = require('helmet');

var appRoutes = require('./routes/index');
var postRoutes = require('./routes/posts');
var authRoutes = require('./routes/auth');

var app = express();

mongoose.connect('mongodb://localhost:27017/soa-progetto');
mongoose.set('debug', true);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'img' , 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Helmet middleware for XSS protection, and more.
app.use(helmet());

app.use('/api/stories', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  return res.render('index');
});


module.exports = app;
