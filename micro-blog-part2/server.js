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
	db.Post.find().exec(function (error, post){
		if (error){
			console.log(" error: " + error);
		}
		db.Post.find().populate('stories').exec(function (error, posts) {
			if (error){
			console.log(" error: " + error);
			}
			res.render('index', {
									posts:posts
								});
		})
		
	})
});


app.get('/index1/:id', function (req, res){
	db.Post.findOne({_id:req.params.id}).exec(function(error, post){
		if(error){
			console.log("error : ", error);
		}
	
		res.render('index1', {post : post});
	});

});

app.get('/api/posts', function (req, res){
	db.Post.find().exec(function (error, posts){
		if (error){
			console.log(" error: " + error);
		}
		res.json(posts);	
	})
});

app.get('/api/posts/:id', function (req, res){
	db.Post.find({_id:req.params.id}).exec(function (error, posts){
		if (error){
			console.log(" error: " + error);
		}
		res.json(posts);	
	})
});

app.post('/api/posts', function (req, res){
	var newPost = req.body;
	var postNew = {
		name:newPost.name,
		content: newPost.content,
		stories:[]
	}
	db.Post.create(postNew, function (error, post){
		if (error){
			console.log("error: " + error);
		}
		console.log("Success creating " + post.name + ' ' + post.content);
		res.json(post);
	});
});

app.post('/', function (req, res){
	var newPost = req.body;
	var postNew = {
		name:newPost.name,
		content: newPost.content,
		stories:[]
	}
	db.Post.create(postNew, function (error, posts){
		if (error){
			console.log("error: " + error);
		}
		console.log("Success creating " + postNew.name + ' ' + postNew.content);
		res.render('index', {posts:posts});
	});
});

app.post('/api/posts/:post_id/comments', function (req,res){
	var commentName    = req.body.nameC;
	var commentContent = req.body.com;
	var id = req.params.post_id;
	var newCom = {
		name:commentName, 
		content: commentContent, 
	};
	console.log("the new com is :" , newCom);
	console.log('the id is : ' , id);
    db.Comment.create(newCom , function (error, createdCom){
    	if(error){
    		console.log("error : " ,error);
    	}
    	db.Post.findOne({_id:id}, function (error, postFound) {
    		
    		db.Post.find({}).exec(function (err, p){
    			console.log('the posts are :' ,p);
    		})
    		console.log('the postFound is ', postFound);
    		debugger;
	        postFound.stories.push(createdCom);
	        postFound.save();
	        res.json(createdCom);
	        console.log('now the post found is :' ,postFound);
    	});
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