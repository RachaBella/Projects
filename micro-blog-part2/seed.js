var db = require("./models");

var posts_list =[
  {name: "Tiramisu", content: "quite" , date: Date.now(), comment: [], likes: 0},
  {name: "Green Eggs & Ham", content: "I do not like them", date: Date.now(), comment: [], likes: 0},
  {name: "Crayfish", content: "guar-on-tee", date: Date.now(), comment: [], likes: 0},
  {name: "Foie Gras", content: "omg", date: Date.now(), comment: [], likes: 0},
  {name: "Kale", content: "meh", date: Date.now(), comment: [], likes: 0}
];

db.Post.create(posts_list, function(err, posts){
    if (err) { return console.log(err); }
    console.log("created", posts.length, "posts");
    process.exit();
});

