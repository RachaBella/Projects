var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
	name: String,
	content: String,
	date : {
		type: Date,
		default:Date.now()
	},
	comment: [{
		nameC: String,
		contentC: String,
		dateC: Date
	}],
	likes:Number
});

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;