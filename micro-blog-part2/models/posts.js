var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
var comment = require('./comments.js')

var PostSchema = new Schema({
	name: {
		type:String,
    	maxlength: 15,
    	required: true
	},
	content: {
		type:String,
    	maxlength: 25,
    	required: true
	},
	date : {
		type: Date,
		default:Date.now()
	},
	stories : [{type: Schema.Types.ObjectId, ref: 'Comment'}],
	likes:Number
});


var Post   = mongoose.model('Post', PostSchema);
module.exports = Post;
