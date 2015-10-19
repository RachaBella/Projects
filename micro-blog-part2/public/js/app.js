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
				}else if ((newPost.content === '')||(newPost.name === '')){
					sweetAlert("Oops...", "You should wrtie something!", "error");
				}
			});
			$(this).parent().find('.name-Input').val('');
			$(this).parent().find('.text-Input').val('');
		}
	});

	//When I click on the 'post it' button 
	$("#button-Post").on('click', function(event){
		event.preventDefault();
		var parentId = $(this).parent().attr('id');
		console.log("the parent id is : "+ parentId);
		$.post("/api/posts", $("#"+parentId).serialize(), function (response){
			var newPost = response;
			console.log('the values : ' + newPost.name +' ' + newPost.content);
			debugger;
			if(newPost.content !== ''){
				addPost(newPost._id,newPost.name,newPost.content);
			}else if (newPost.content === ''){
				sweetAlert("Oops...", "You should wrtie something!", "error");
			}
		});
		$(this).parent().find('.name-Input').val('');
		$(this).parent().find('.text-Input').val('');
	});

	//When I click on the 'close' button
	$(document).on('click', '#boxclose', function(){
		var parentId = $(this).parent().attr('id');
		console.log('the id of that post is : ' + parentId);
		$.ajax ({
			url: '/api/posts/' + parentId,
			type: 'DELETE',
			success : function (response){
				console.log(response ," sucess deleting");
				$("#"+parentId).remove();
				swal("Post deleted!");
			}
		});
	});

	//When i click on the comment button
	$(document).on('click', '#button-com', function(){
		//When i click on the confirmation comment button
		$('#comment-box').fadeIn( "slow" );
		$('#section1').css('opacity', '0.6');
		$('#section2').css('opacity', '0.6');
		parentId = $(this).parent().attr("id");
		console.log('the parent id is', parentId);
		$(document).on('click', '.com-button', function(){
			$.post('/api/posts/'+parentId +'/comments' , $(this).parent().serialize(), function (response){
				if((response.content !=='')&&(response.name!=='')){
					$('#comment-box').fadeOut( "slow" );
					$('#section1').css('opacity', '1');
					$('#section2').css('opacity', '1');
					console.log(response.name+ ' ' + response.content);
					$('#'+parentId).append('<p><strong>'+ response.name+' </strong>'+ response.content + '<br>');
				}else if((response.content ==='') || (response.name ==='')){
					sweetAlert("Oops...", "You should wrtie something! or cancel", "error");
				}
			});
			$(this).parent().find('#name').val('');
			$(this).parent().find('#com').val('');
		});

		//When i click on the cancel button in the comment Box
		$(document).on('click', '.cancel-button', function(){
			$('#section1').css('opacity', '1');
			$('#section2').css('opacity', '1');
			$('#comment-box').fadeOut( "slow" );
		});
	});

//WHen i CLick on the post
	$(document).on( 'click', '.postLink', function (event){
		parentId= $(this).closest('div').attr('id');
		console.log("the parentId is ", parentId);
		debugger;
		$.get('/index1/'+ parentId, function (response) {
			var post= response;
			console.log('the post is', post);
		});
	});
}

//the add post will add the html elements on the index.ejs
function addPost(ids,name,content){
	var div ='<a href="index2.ejs"><div id= \"'+ ids + '\"'+'class = "col-lg-3 col-sm-3 box1" style ="display: none"> <a class="boxclose" id="boxclose"></a> <h1 id="hOne">'
		+ name + '</h1><p>'
		+ content 
		+ '</p><br/><a href="#" id="button-com" class="btn btn-danger btn-lg btn-huge lato" data-toggle="modal" data-target="#myModal"> Comment</a><br><hr></div></a> ';
		$('.row1').prepend(div);
		$(".col-sm-3").slideDown('slow');
		$('.text-Input').val('');
		$('.name-Input').val('');
};
