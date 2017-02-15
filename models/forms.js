var mongoose = require('mongoose');
var user = require('../services/user');

var formSchema = mongoose.Schema({
  userId:String,
  rating:Number, entry:String, month:Number, date: { type: Date, default: (new Date).toDateString().substr(0,10) }
});

module.exports = mongoose.model('Form', formSchema);
