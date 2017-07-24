var mongoose = require('mongoose');
var moment = require('moment');

var CommentSchema = new mongoose.Schema({
  username: {type: Array, default: ''},
  zone: {type: String, default: ''},
  body: {type: String, default: ''},
  author: {type: mongoose.Schema.Types.Mixed, default: {}},
  image: {type: String, default: ''},
  timestamp: {type: String, default: moment().format('MMMM Do YYYY h:mm:ss a')},
});

module.exports = mongoose.model('CommentSchema', CommentSchema);
