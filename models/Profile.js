var mongoose = require('mongoose');
var moment = require('moment');

var ProfileSchema = new mongoose.Schema({
  username: {type: String, default: ''},
  city: {type: String, default: ''},
  gender: {type: String, default: ''},
  password: {type: String, default: ''},
  image: {type: String, default: ''},
  timestamp: {type: String, default: moment().format('MMMM Do YYYY h:mm:ss a')},
});

module.exports = mongoose.model('ProfileSchema', ProfileSchema);
