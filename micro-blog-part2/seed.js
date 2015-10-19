var db = require("./models");


/*var comments_list=[
{name:"fffff", content:"fffffff", _postid:"5622bf48744b8dc01e429e22"},
{name:"fffff", content:"fffffff", _postid:"5622bf48744b8dc01e429e22"},
{name:"fffff", content:"fffffff", _postid:'5622bf48744b8dc01e429e22'},
{name:"fffff", content:"fffffff", _postid:"5622bf48744b8dc01e429e22"},
{name:"fffff", content:"fffffff", _postid:"5622bf48744b8dc01e429e22"},
{name:"fffff", content:"fffffff", _postid:"5622bf48744b8dc01e429e22"},
];*/

var post_list =[
{name: 'Racha', content:'post1', date: Date.now(),  likes:0 },
{name: 'Racha', content:'post2', date: Date.now(), likes:0 },
{name: 'Racha', content:'post3', date: Date.now(), likes:0 },
{name: 'Racha', content:'post4', date: Date.now(),  likes:0 },
{name: 'Racha', content:'post5', date: Date.now(), likes:0 },
{name: 'Racha', content:'post6', date: Date.now(), likes:0 }
];

db.Post.remove({}, function(err, coms){
db.Post.create(post_list, function(err, posts){
    if (err) { return console.log(err); }
    console.log("created", posts.length, "posts");
    console.log(posts);
    process.exit();
});
});

db.Comment.remove({}, function(err, coms){
//process.exit();
console.log("created", coms.length, "coms");
});

