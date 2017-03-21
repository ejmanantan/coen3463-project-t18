var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var nodemailer = require('nodemailer');


var index = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var recipes= require('./routes/recipes');
var mon = require('./routes/mon');
var tues = require('./routes/tues');
var wed = require('./routes/wed');
var thurs = require('./routes/thurs');
var fri = require('./routes/fri');
var sat = require('./routes/sat');
var contact = require('./routes/contact');

var app = express();


var mdburl = "mongodb://food:recipe@ds111589.mlab.com:11589/coen3463t18"

mongoose.connect(mdburl, function(err, res) {
    if (err) {
        console.log('Error connecting to ' + mdburl);
    } else {
        console.log('MongoDB connected!');
    }
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

var User = require('./models/user');
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', index);
app.use('/users', users);
app.use('/auth/', auth);
app.use('/recipes/', recipes);
app.use('/contact', contact);
app.use('/mon/', mon);
app.use('/tues/', tues);
app.use('/wed/', wed);
app.use('/thurs/', thurs);
app.use('/fri/', fri);
app.use('/sat/', sat);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
