// JAVASCRIPT CLIENT SIDE
console.log("Sanity Check: JS is working!");

$(document).ready(function(){
	pageLoad();
}); 

function pageLoad(){
	//When i press key down (enter) button to post somethinf
	$('.text-Input').keydown(function(event){
		if(event.keyCode == 13){
			var parentId = $(this).parent().attr('id');

			$.post("/api/posts", $("#"+parentId).serialize(), function (response){
				var newPost = response;
				console.log('the values : ' + newPost.name +' ' + newPost.content +' '+ Date.now());
				debugger;
				if(newPost.content !== ''){
					addPost(newPost.id,newPost.name,newPost.content);
				}else if (newPost.content === ''){
					sweetAlert("Oops...", "You should wrtie something!", "error");
				}
			});
		}
	});

	//When I click on the 'post it' button 
	$("#button-Post").on('click', function(event){
		event.preventDefault();
		console.log("submitted");
		var parentId = $(this).parent().attr('id');
		$.post("/api/posts", $("#"+parentId).serialize(), function (response){
			var newPost = response;
			console.log('the values : ' + newPost.name +' ' + newPost.content);
			debugger;
			if(newPost.content !== ''){
				addPost(newPost.id,newPost.name,newPost.content);
			}else if (newPost.content === ''){
				sweetAlert("Oops...", "You should wrtie something!", "error");
			}

		});
	});

	//When I click on the 'close' button
	$(document).on('click', '#boxclose', function(){

	});

	//When i click on the comment button
	$(document).on('click', '#button-com', function(){
		//When i click on the confirmation comment button
		$(document).on('click', '.com-button', function(){

		});

		//When i click on the cancel button in the comment Box
		$(document).on('click', '.cancel-button', function(){

		});

	});
}

//the add post will add the html elements on the index.ejs
function addPost(ids,name,content){
	var div ='<div id= \"'+ ids + '\"'+'class = "col-lg-3 col-sm-3 box1" style ="display: none"> <a class="boxclose" id="boxclose"></a> <h1 id="hOne">'
		+ name + '</h1><p>'
		+ content 
		+ '</p><br/><a href="#" id="button-com" class="btn btn-danger btn-lg btn-huge lato" data-toggle="modal" data-target="#myModal"> Comment</a><br><hr> ';
		$('.row1').prepend(div);
		$(".col-sm-3").slideDown('slow');
		$('.text-Input').val('');
		$('.name-Input').val('');
};
