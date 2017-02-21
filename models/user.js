/**
 * User schema for Mongoose.
 *
 * @module models/user
 */
var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
  googleId: String,
  googleToken: String,
  googleEmail: String,
  googleName: String,
  emergency: Array,
  message: String
});


module.exports = mongoose.model('User', userSchema);
