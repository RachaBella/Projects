console.log("Sanity Check: JS is working!");

$(document).ready(function(){


	var posting = new PostsHandler();
	posting.addListeners();
	

});

var ids=0;
var content; // a content
var p; // a post
var div; // the div that will be added after every click
var name; // the name of the poster
var posts=[];

function Post(name,id, content){
	this.name=name;
	this.id = id;
	this.content = content;
	this.comment = [];
	this.addComment= function(com){
		this.comment.push(com);
	}
	
}

function PostsHandler() {
	this.posts= [];
	console.log ('this.posts = ' + this.posts);
	this.addListeners= function(){
		$('.text-Input').keydown(function(event){
			if(event.keyCode == 13){
	        	//$("#button-Post").click();
	        		ids++;
					debugger;
					content = $('.text-Input').val();
				    name    = $('.name-Input').val();
				    if (content !==''){
				    p = new Post(name,ids,content);
				    console.log('the post is' + p);
				    console.log('this is '+ this);
				    console.log ('this.posts = ' + this.posts);
				    posts.push(p);
				    addPost(ids,name,content); 
				    }else if (content ==='')
				    {
				    	alert("You should write something, try again");
				    }	
			}
			

		});
		$('#button-Post').on('click', function(){
					ids++;
					debugger;
					content = $('.text-Input').val();
				    name    = $('.name-Input').val();
				   if (content !==''){
				    p = new Post(name,ids,content);
				    console.log('the post is' + p);
				    console.log('this is '+ this);
				    console.log ('this.posts = ' + this.posts);
				    posts.push(p);
				    addPost(ids,name,content); 
				    }else if (content ==='')
				    {
				    	sweetAlert("Oops...", "You should wrtie something!", "error");
				    }


			});

		$('.boxclose').on('click', function(){
			alert('clicked');

		});
	};
}
/*
$("#id_of_textbox").keyup(function(event){
    if(event.keyCode == 13){
        $("#id_of_button").click();
    }
});

*/

function addPost(ids,name,content){
		var div ='<div id= \" '+ ids + '\"'+'class = "col-lg-3 col-sm-3 box1" style ="display:none"> <a class="boxclose" id="boxclose"></a> <h1 id="hOne">'
		+ name + '</h1><p>'
		+ content 
		+ '</p><br/><a href="#" id="button-com" class="btn btn-danger btn-lg btn-huge lato" data-toggle="modal" data-target="#myModal"> Comment</a> ';
		$('.row1').prepend(div);
		$(".col-sm-3").slideDown('slow');
		$('.text-Input').val('');
		$('.name-Input').val('');
	};


