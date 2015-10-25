var mongoose = require("mongoose");
var Schema   = mongoose.Schema;
var advice   = require('./advice.js');

var doctorSchema = new Schema ({
	firstName :String,
	lastName : String,
	speciality : String,
	address : String,
	advice: [{type: Schema.Types.ObjectId, ref: 'Advice'}],
	network:String
});

var Doctor = mongoose.model("Doctor", doctorSchema);
module.exports= Doctor;