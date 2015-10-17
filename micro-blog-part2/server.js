// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express"),
    app = express(),
    path = require("path"),
    bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	db = require('./models');

// CONFIG //
// set ejs as view engine
app.set('view engine', 'ejs');
// serve js & css files
app.use("/static", express.static("public"));
// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

//METHODS //
app.get('/', function (req, res){
	db.Post.find().exec(function (error, posts){
		if (error){
			console.log(" error: " + error);
		}
		res.render('index', {posts:posts});
	})
});

app.get('/api/posts', function (req, res){
	db.Post.find().exec(function (error, posts){
		if (error){
			console.log(" error: " + error);
		}
		res.json(posts);	
	})
});

app.post('/api/posts', function (req, res){
	var newPost = req.body;
	db.Post.create(newPost, function (error, post){
		if (error){
			console.log("error: " + error);
		}
		console.log("Success creating " + post.name + ' ' + post.content);
		res.json(post);
		
	});

});

app.post('/', function (req, res){
	var newPost = req.body;
	db.Post.create(newPost, function (error, post){
		if (error){
			console.log("error: " + error);
		}
		console.log("Success creating " + post.name + ' ' + post.content);
		res.render('index', {posts:posts});
		
	});
});

app.delete('/api/posts/:id', function (req, res) {
	var id= req.params.id;
	console.log('the id is : '+ id)
	db.Post.remove({ _id: id }, function (error, post){
		if(error){
			console.log(" there was an error ! sorry" , error);
		}
		res.send(post);
	});
});

// 
app.listen(4000, function (){
  console.log("listening on port 4000 ... success :)");
});