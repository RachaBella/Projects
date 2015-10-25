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

// 
app.get('/',function (req, res){
	res.render('index');
})

app.post('/', function (req, finalres){
	var input = req.body;
	var advices=[];
	console.log("the search word is", input);
	db.Keyword.find({content: input.search} ,function (error, respo){
		console.log('1- the keyword found', respo);
		db.Advice.find().populate('keywords').exec(function (error, res){
			console.log('2- the keyword found', res);
			for (var i=0; i< res.length;i++){
				if (respo._id == res[i].keywords._id){
					advices.push(res[i]);
				}
			}
			console.log('\n\n\n*****************************\n\n\nthe advices are :', advices);
			finalres.send(advices);
		});	
	});

});

app.listen(4000, function (){
  console.log("listening on port 4000 ... success :)");
});