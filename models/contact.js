var mongoose = require('mongoose');


var contactSchema = mongoose.Schema({
  name:String,
  phone:String
});

module.exports = mongoose.model('Contact', contactSchema);
