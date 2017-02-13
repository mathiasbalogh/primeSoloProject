var mongoose = require('mongoose');

var formSchema = mongoose.Schema({
  formData:[{{rating:Number, entry:String},date: { type: Date, default: Date.now }}]
});

module.exports = mongoose.model('Form', formSchema);
