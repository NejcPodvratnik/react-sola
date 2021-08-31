var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var photoSchema = new Schema({
	'name' : String,
	'path' : String,
	'views' : Number,
	'likes' : Number,
	'author': String,
	'date' : Date,
	'likedBy' : Array,
	'comments' : Array,
	'tag' : String,
	'flagCount' : Number

});

module.exports = mongoose.model('photo', photoSchema);
