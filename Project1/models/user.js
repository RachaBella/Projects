var mongoose = require("mongoose");
var Schema   = mongoose.Schema;
var keyword   = require('./keyword.js');
var bcrypt = require("bcryptjs");

var userSchema = new Schema ({
	firstName :String,
	lastName : String,
	address : String,
	email: {
		type:String,
		require:true,
		unique:true
	},
	passwordDigest: String,
	medicalRecord:Array,
	keywordsTyped: [{type: Schema.Types.ObjectId, ref: 'Keyword'}],
	network:String,
	img: { data: Buffer, contentType: String }
});

userSchema.statics.createSecure = function (firstName, lastName, email, password, callback) {
	var user = this;
	//console.log("we are in the secure function creation");
    // hash password user enters at sign up
    bcrypt.genSalt(function (err, salt) {
	    bcrypt.hash (password, salt, function (err, hash) {
		    //console.log(hash);
		        // create the new user (save to db) with hashed password
		    user.create({
		        firstName:firstName,
		        lastName: lastName,	
		        email: email,
		        passwordDigest: hash,
		        medicalRecord:[],
		        keywordsTyped:[],
		        }, callback);
		});
	});
}

userSchema.statics.updatePasswordSecure = function ( id ,password , callback) {
	var user = this;
	if (password) {
		bcrypt.genSalt(function (err, salt) {
	    bcrypt.hash (password, salt, function (err, hash) {
		    //console.log(hash);
		        // create the new user (save to db) with hashed password
		    user.findByIdAndUpdate(id, { $set : {passwordDigest: hash }} , callback);
		});
	});

	}
}

// authenticate user (when user logs in)
userSchema.statics.authenticate = function (password, email, callback) {
    // find user by email entered at log in
    this.findOne({email: email}, function (err, user) {
     // console.log(user);

      // throw error if can't find user
      if (!user) {
        console.log('No user with email ' + email);
        callback (null, 'wrong email');
      // if found user, check if password is correct
      } else if (user.checkPassword(password)) {
        callback(null, user);
      }else {
      	callback("Error: incorrect password", null);
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