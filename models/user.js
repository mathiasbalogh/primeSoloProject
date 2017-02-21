/**
 * User schema for Mongoose.
 *
 * @module models/user
 */
var mongoose = require('mongoose');

var contactSchema = require('./contact.js').schema;

var userSchema = mongoose.Schema({
  googleId: String,
  googleToken: String,
  googleEmail: String,
  googleName: String,
  emergency: [contactSchema],
  message: String
});


module.exports = mongoose.model('User', userSchema);
