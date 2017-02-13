var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('./auth/passport');
var configs = require('./config/auth');
var index = require('./routes/index');
var auth = require('./routes/auth');
var isLoggedIn = require('./utils/auth');
var private = require('./routes/private/index');
var database = require('./utils/database');

var mongoose = require('mongoose');

var app = express();

app.use(bodyParser.json());
database();

app.use(session({
  secret: configs.sessionVars.secret,
  key: 'user',
  resave: 'true',
  saveUninitialized: false,
  cookie: { maxage: 60000, secure: false },
}));
/** ---------- PASSPORT ---------- **/
app.use(passport.initialize()); // kickstart passport
/**
 * Alters request object to include user object.
 * @see {@link auth/passport}
 */
app.use(passport.session());
/** ---------- ROUTES ---------- **/
app.use('/auth', auth);
app.use('/private', isLoggedIn, private);
app.use('/', index);
// mongoose.connect('mongodb://localhost:27017/MindSpace');
// var db= mongoose.connection;
//
// db.on('connected', function(){
//   console.log('Sweet...connected to db!');
// });
// db.on('error', function(){
//   console.log('Lame...not connected to db!');
// });

app.use(express.static('public'));
//
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});

var server = app.listen(process.env.PORT || 3000 , function(){
  console.log('Server listening');
});
