var mongoose = require("mongoose");
var Schema   = mongoose.Schema;
var keyword   = require('./keyword.js');
var bcrypt = require("bcryptjs");

var userSchema = new Schema ({
	firstName :String,
	lastName : String,
	address : String,
	email: String,
	passwordDigest: String,
	medicalRecord:Array,
	keywordsTyped: [{type: Schema.Types.ObjectId, ref: 'Keyword'}],
	network:String
});

userSchema.statics.createSecure = function (firstName, lastName, address, email, password,network, callback) {
	var user = this;
    // hash password user enters at sign up
    bcrypt.genSalt(function (err, salt) {
	    bcrypt.hash(password, salt, function (err, hash) {
		    console.log(hash);
		        // create the new user (save to db) with hashed password
		    user.create({
		        firstName:firstName,
		        lastName: lastName,
		        address:address,	
		        email: email,
		        passwordDigest: hash,
		        medicalRecord:[],
		        keywordsTyped:[],
		        network:network
		        }, callback);
		});
	});
}

// authenticate user (when user logs in)
userSchema.statics.authenticate = function (password, email, callback) {
    // find user by email entered at log in
    this.findOne({email: email}, function (err, user) {
      console.log(user);

      // throw error if can't find user
      if (!user) {
        console.log('No user with email ' + email);

      // if found user, check if password is correct
      } else if (user.checkPassword(password)) {
        callback(null, user);
      }
    });
  };

  // compare password user enters with hashed password (`passwordDigest`)
userSchema.methods.checkPassword = function (password) {
  // run hashing algorithm (with salt) on password user enters in order to compare with `passwordDigest`
  return bcrypt.compareSync(password, this.passwordDigest);
};

var User = mongoose.model('User', userSchema);
module.exports = User;