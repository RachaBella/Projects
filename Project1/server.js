// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express"),
    app = express(),
    path = require("path"),
    bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
    db = require('./models'),
    session = require('express-session');

// CONFIG //
// set ejs as view engine
app.set('view engine', 'ejs');
// serve js & css files
app.use("/static", express.static("public"));
// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'OurSuperSecretCookieSecret',
  cookie: { maxAge: 600000 }
}));

// 
app.get('/',function (req, res){
	res.render('index');
})

app.post('/search', function (req, finalres){
	var input = req.body;
	var advices=[];
	//console.log("the search word is", input);
	db.Keyword.find({content: input.search} ,function (error, respo){
		//console.log('1- the keyword found', respo);
		db.Advice.find().populate('keywords').exec(function (error, res){
			//console.log('2- the keyword found', res);
			for (var i=0; i< res.length;i++){
				if (respo._id == res[i].keywords._id){
					advices.push(res[i]);
				}
			}
			//console.log('\n\n\n*****************************\n\n\nthe advices are :', advices);
			finalres.json(advices);
		});	
	});

});

//Signing up :
app.post('/users', function (req, res) {
	var newUser = {
		firstName :req.body.firstName,
		lastName : req.body.lastName,
		email: req.body.email,
		password: req.body.password,
	};
	//console.log('the name :', req.body.firstName )
	db.User.createSecure(req.body.firstName, req.body.lastName, req.body.email, req.body.password, function (error, newUser){
		if(error) {
			console.log(" error : ",error);
		} 
		req.session.userId = newUser._id;
		req.session.user = newUser;
		//console.log('the session id is :', req.session.userId )
		res.send(newUser);
	} )
});

//log out :
app.post('/logout', function (req , res) {
	//console.log("the result is ", result);
	req.session.user = null;
	req.session.userId=null;
	res.json(req.session.user);
});


//LOGIN
app.post('/login', function (req, res) {
	//console.log("the login function : password = ", req.body.password2);
	db.User.authenticate(req.body.password2, req.body.email2 , function (error, userFound) {
		if(error) {
			console.log(" error : ",error);
			res.json("password wrong")
		} else if ((userFound !== null) && (userFound !== 'wrong email')){
			req.session.userId = userFound._id;
			req.session.user = userFound;
			console.log("sessiosn verification :", req.session.userId )
			res.json(userFound);
		} else if (error ==="Error: incorrect password" ) {
			res.send("password wrong");
		} else if (userFound === 'wrong email'){
			res.send('wrong email');
		}

	})
})

//Get the profile page 
app.get('/profile/:name', function (req, res) {
	var name = req.params.name;
	var userSession= req.session.user;
	//console.log('the user session :', userSession);
	res.render('userProfile', {user : userSession});
});

//Get the information to show in the update form
app.get('/profileUpdate', function (req, res) {
	db.User.findOne({_id : req.session.userId} , function (error, userFound) {
		if(error) {
			console.log("Error" , error);
		}else {
			res.json(userFound);
		}
	})
});

//Update the information of the user
app.patch('/updateProfile/:id', function (req , res) {
	var result = req.body.record.split(",");
	var user = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		network: req.body.network,
		medicalRecord: result
	};
	db.User.findByIdAndUpdate(req.session.userId, { $set : user} , function (error, userUpdated) {
		if(error) {
			console.log("Error :" , error); 
		}		
	});
	db.User.findOne({_id : req.session.userId}, function (error, userUp) {
		console.log('THE UPDATED USER IS :', userUp);
		req.session.user = userUp;
		res.json(userUp);	
	})
});


//Sessions
app.get("/current_user" , function (req , res) {
	var user = req.session.user;
	//console.log("the session is:", req.session.user);
	res.json({user : req.session.user});
	
})
app.get("/" , function (req , res) {
	var user = req.session.user;
	//console.log("the session is:", req.session.user);
	res.json({user : req.session.user});
	
})

app.listen(4000, function (){
  console.log("listening on port 4000 ... success :)");
});