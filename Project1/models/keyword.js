
var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var keywordSchema= new Schema ({
	content : String,
	createdDate:{
		type:String,
		default: Date.now()
	}
})

var Keyword   = mongoose.model('Keyword', keywordSchema);
module.exports= Keyword;