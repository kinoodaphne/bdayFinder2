const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('./passport/passport');
const FacebookStrategy = require('passport-facebook');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiChatRouter = require('./routes/api/v1/chat');

const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/bdayFinderV2', {useNewUrlParser: true});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/chat', passport.authenticate('jwt', { session: false }), apiChatRouter);

// /* passport Facebook */
// var FACEBOOK_APP_ID = '445650516283288';
// var FACEBOOK_APP_SECRET = '227831f17aa0225d34320337a4159d92';


// passport.use(new FacebookStrategy({
//   clientID: FACEBOOK_APP_ID,
//   clientSecret: FACEBOOK_APP_SECRET,
//   callbackURL: "http://localhost:3000/auth/facebook/callback",
//   profileFields: ['email']
// },
// function(accessToken, refreshToken, profile, cb) {
//   console.log(accessToken, refreshToken, profile, cb);
//   User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//     return cb(err, user);
//   });
// }));

// /* Checking if it redirects to facebook for authentication */
// app.route('/facebook').get(passport.authenticate('facebook', { scope: ['email'] }));

// app.route('/auth/facebook/callback')
// .get(passport.authenticate('facebook', (err, user, info) => {
//   console.log(err, user, info);
// }));

// app.get('/facebook',
//   passport.authenticate('facebook', { scope: ['email'] }));

// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });

app.use(passport.initialize());
app.use(passport.session());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
