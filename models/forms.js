var mongoose = require('mongoose');
var user = require('../services/user');

var formSchema = mongoose.Schema({
  userId:String,
  rating:Number, entry:String, date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Form', formSchema);
