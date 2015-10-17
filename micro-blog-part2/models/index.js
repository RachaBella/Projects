var mongoose = require('mongoose');

//Lets connect to our database using the DB server URL.
mongoose.connect('mongodb://localhost/microblog_app');
module.exports.Post = require("./posts.js");