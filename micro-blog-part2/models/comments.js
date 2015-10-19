var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = new Schema({
	content:{
		type:String,
		required: true,
		maxlength:20
	},
	name:{
		type:String,
		required: true,
		maxlength:10
	}
});
var Comment= mongoose.model('Comment', CommentSchema);
module.exports = Comment;
