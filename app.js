var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var consign = require('consign');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var apiRoutes = express.Router();

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {

  // check header for token authentication
  var user_key = req.headers['firebase_key'];
  var models  = require('./models');

  models.User.findOne({
    where: {
      firebase_key: user_key
    }
  }).then(function(user) {
    if (user) {
        req.user_id = user.id;
        next();
    } else {
      return res.status(403).send({
          success: false,
          message: 'No User Key provided.'
        });
    }
  })
});

app.use('/api', apiRoutes);

consign().
  include('routes').
  then('serializers').
  into(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
