var mongoose = require('mongoose');

//Lets connect to our database using the DB server URL.
mongoose.connect('mongodb://localhost/iHelp');
module.exports.Keyword = require("./keyword.js");
module.exports.Advice= require("./advice.js");
module.exports.Doctor = require("./doctor.js");
module.exports.User= require("./user.js");