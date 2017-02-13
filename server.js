var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/MindSpace');
var db= mongoose.connection;

db.on('connected', function(){
  console.log('Sweet...connected to db!');
});
db.on('error', function(){
  console.log('Lame...not connected to db!');
});

app.use(express.static('public'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});

var server = app.listen(process.env.PORT || 3000 , function(){
  console.log('Server listening');
});
