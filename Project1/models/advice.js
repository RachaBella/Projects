var mongoose = require("mongoose");
var Schema   = mongoose.Schema;
var keyword  = require('./keyword.js');

var adviceSchema= new Schema({
	title:String,
	content: String,
	keywords:[{type: Schema.Types.ObjectId, ref: 'Keyword'}],
	links:Array,
	img:String
}); 

var Advice     = mongoose.model("Advice" , adviceSchema);
module.exports = Advice;