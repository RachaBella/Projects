console.log("Sanity check !! It works dear <3 <3 <3");
var myReader = new FileReader();
var userId;
$(document).ready(function (){
	 pageLoad();
});

function pageLoad(){
	checkAuth();
	$('#searchButton').on('click', function (event){
		event.preventDefault();
		var serialize = $(".search-form").serialize();
		console.log("the serialize thing is", serialize);
		$.post('/search', serialize, function(response){
			console.log('the response contains', response);
			$('#lightbox').children().remove();
			var j=0;
			for (var i=0;i < response.length;i++) {

					$('#lightbox').append('<div class="col-sm-6 col-md-3 col-lg-3 isotop-item"><div class="portfolio-item"><div class="hover-bg"><a href="#"><div class="hover-text"><h4>'
						+response[i].title 
						+'</h4><small>'
						+ response[i].keywords[0].content 
						+'</small><div class="clearfix"></div><i class="fa fa-plus"></i></div><img src="'
						+ response[i].img 
						+'" class="img-responsive" alt="..."></a></div></div></div>');
				
			}
		});
	});

	$(document).on('click', '#signButton', function () {
		$('#tf-sign').show();
		$('html, body').animate({
        scrollTop: $("#tf-sign").offset().top
    	}, 500);
		$('#tf-menu').css('display', 'none');
		$('#tf-home').css('opacity', '0.5');
		$('#tf-about').css('opacity', '0.5');
		$('#tf-testimonials').css('opacity', '0.5');
		$('#tf-services').css('opacity', '0.5');
		$('#tf-team').css('opacity', '0.5');
		$('#tf-works').css('opacity', '0.5');
		$('#tf-contact').css('opacity', '0.5');
	});

	$('#boxclose').on('click', function () {
		disappearForm();
	});

	//The sign Up form :
	$('#signUp').on('click', function (event) {
		event.preventDefault();
		if(($('#firstName').val()==='') || ($('#lastName').val() ==='') || ($('#email').val()==='') || ($('#password').val()==='')){
			alert(' You should fill the information in the required fields. TRY AGAIN');
		}
		else {
			$.post('/users', $('#signupForm').serialize(), function (response) {
			console.log('the serialize is', $('.form').serialize() )
			console.log('congrats new User : ', response);
			$('#signButton').remove();
			$('#ulNav').append('<li class="dropdown" id="'+response._id +'"><a href="#" class="page-scroll dropdown-toggle" data-toggle="dropdown">'+response.firstName+'<span class="caret"></span></a><ul class="dropdown-menu" role="menu"><li><a id ="profileButton" href="/profile/'+response.firstName +'">Profile</a></li><li class="divider"></li><li><a id="logOut" href="">Log out</a></li></ul></li>')
			$('#field1').html('<label>First Name<span class="req">*</span></label><input type="text" name="firstName" id="firstName" required autocomplete="off" />');
			$('#field2').html('<label>Last Name<span class="req">*</span></label><input name ="lastName" id="lastName" type="text"required autocomplete="off"/>');
			$('#field3').html('<label>Email Address<span class="req">*</span></label><input type="email" name ="email" id= "email" required autocomplete="off"/>');
			$('#field4').html('<label>Set A Password<span class="req">*</span></label><input type="password" name="password" id="password" required autocomplete="off"/>')
			disappearForm();
		});
		}
	});

	//The logging off form :
	$(document).on('click',"#logIn", function (event) {
		event.preventDefault();
		if(($('#email2').val() ==='') || ($('#password2').val() ==='')) {
			swal({   
				title: "Field empty?",   
				text: "You have to fill all the fields !",   
				type: "warning",   
				showCancelButton: true,      
				closeOnConfirm: false 
			}); 
		}else {
			$.post('/login',$('#loginForm').serialize(), function (response) {
				console.log("the response is :" , response);
				if ((response !== null)&& (response !=='wrong email') && (response !== 'password wrong')) {
					$('#signButton').remove();
					$('.signButton').remove();
					$('#ulNav').append('<li class="dropdown" id="'+response._id +'"><a href="#" class="page-scroll dropdown-toggle" data-toggle="dropdown">'+response.firstName+'<span class="caret"></span></a><ul class="dropdown-menu" role="menu"><li><a id ="profileButton" href="/profile/'+ response.firstName+'">Profile</a></li><li class="divider"></li><li><a id="logOut" href="#">Log out</a></li></ul></li>')
					disappearForm();
					$('#field5').html('<label>Email Address<span class="req">*</span></label><input type="email" name ="email2" id= "email2" required autocomplete="off"/>');
					$('#field6').html('<label>Set A Password<span class="req">*</span></label><input type="password" name="password2" id="password2" required autocomplete="off"/>')
			
				} else if (response === 'wrong email') {
					swal("Error!", "This user doesn't exist, Try again !");
				} else if (response ==="password wrong") {
					swal("Error!", "Wrong password, Try again !")
				}
			});
		}
	});

	// loging out
	$(document).on('click', '#logOut' , function (event) {
		event.preventDefault();
		swal({   
			title: "Are you sure?",   
			text: "You will be logged off your account !",   
			type: "warning",   
			showCancelButton: true,   
			confirmButtonColor: "#FCAC45",   
			confirmButtonText: "Yes, log out!",   
			closeOnConfirm: false 
		}, 
			function(){  
				$.post('/logout', function (response) {
  					console.log("the response from the logout request :", response);
	  				if (response === null) {
		  				$('.dropdown').remove();
		  				$('#ulNav').append('<li><a  class="page-scroll" id="signButton">Sign In</a></li>');
	  				}
  				}); 
  				window.location.href = "/";
			}
		);	

	});

	//clicking on the profile button in the home page
	$(document).on('click', '#profileButton',  function (event) {
		console.log('the user name is :', $('a.dropdown-toggle').text());
		$.get('/profile/'+ $('a.dropdown-toggle').text(), function (response) {
			console.log('the response profile is :', response);
		})
	})

	//Editing the profile
	$(document).on('click','.editProfile', function (event) {
		//we will get the previous information of the user and show them in the box
		$.get('/profileUpdate', function (response) {
			if(response) {
				var userId= response._id
				$("#firstName").val(response.firstName);
				label = $("#firstName").prev('label');
				label.addClass('active highlight');
				$('#lastName').val(response.lastName);
				label = $('#lastName').prev('label');
				label.addClass('active highlight');
				$("#email").val(response.email);
				label = $('#email').prev('label');
				label.addClass('active highlight');
				$('#network').val(response.network);
				label = $('#network').prev('label');
				label.addClass('active highlight');
				$('#record').val(response.medicalRecord);
				label = $('#record').prev('label');
				label.addClass('active highlight');
			}
		});
		$('#tf-profile').show();
		$('html, body').animate({
        scrollTop: $("#tf-profile").offset().top
    	}, 500);
    	$('#tf-menu').css('display', 'none');
		$('#tf-home').css('opacity', '0.5');
		$("#profileForm").on('submit',function (event) {
			$.ajax({
			    url: '/updateProfile/'+ userId ,
			    type: 'PATCH',
			    data: $("#profileForm").serialize(),
			    success: function (response) {
			      // once successful, replace the user in the DOM
			      console.log('the user update is :', response); 
			    },
			    error: console.log("une erreure inattendue")
			});
		})
	});

	//closing the profile form
	$(document).on('click', '#boxclose2', function () {
		$('#tf-profile').hide();
		$('html, body').animate({
        	scrollTop: $("#tf-home").offset().top
   		 }, 500);
		$('#tf-menu').css('display', 'block');
		$('#bs-example-navbar-collapse-1').css('opacity', '1');
		$('#tf-home').css('opacity', '1');
	})

	function checkAuth(){
		$.get("/current_user", function(data){
			console.log('the user is : ', data);
			if(data.user){
				uderId= data.user._id;
				console.log("the check auth , the user id is : ", data.user._id);
				$('#signButton').remove();
				$('.signButton').remove();
				$('#ulNav').append('<li class="dropdown" id="'+data.user._id +'"><a href="#" class="page-scroll dropdown-toggle" data-toggle="dropdown">'+data.user.firstName+'<span class="caret"></span></a><ul class="dropdown-menu" role="menu"><li><a  id ="profileButton" href="/profile/'+ data.user.firstName +'">Profile</a></li><li class="divider"></li><li><a id="logOut" href="#">Log out</a></li></ul></li>')
				
			}else {
			}
			return userId;
		});
	};

	//the login
	$('#logIn').on('click', function (event){
		event.preventDefault();
		if(($('#email2').val()==='') || ($('#password2').val()==='')){
			alert(' You should fill the information in the required fields. TRY AGAIN');
		}
		else {
			$.post('/login', $('.form').serialize(), function (response) {
				disappearForm();
			})
		}
	})

	//When i want to sign in, after clicking on the sign in button : i call this function 
	function disappearForm(){
		$('#tf-sign').hide();
		$('html, body').animate({
        scrollTop: $("#tf-home").offset().top
    }, 500);
		$('#tf-menu').css('display', 'block');
		$('#bs-example-navbar-collapse-1').css('opacity', '1');
		$('#tf-home').css('opacity', '1');
		$('#tf-about').css('opacity', '1');
		$('#tf-testimonials').css('opacity', '1');
		$('#tf-services').css('opacity', '1');
		$('#tf-team').css('opacity', '1');
		$('#tf-works').css('opacity', '1');
		$('#tf-contact').css('opacity', '1');
	};

	//The upload button 
	$('#realUploadBtn').on ('change', function () {
		if (typeof (FileReader) != "undefined") {
            var image_holder = $("#imageContainer");
            image_holder.empty();
            var reader = new FileReader();
            reader.onload = function (e) {
                $("<img />", {
                    "src": e.target.result,
                    "class": "thumb-image img-responsive img-circle profile-img",
                }).appendTo(image_holder);
 
            }
            image_holder.show();
            reader.readAsDataURL($(this)[0].files[0]);
        } else {
            alert("This browser does not support FileReader.");
        }

	});

	//the dropdown nav : 
	$(document).on("mouseover", ".dropdown", function(e) {
		e.preventDefault();
	    $('.dropdown').css('background-color', 'transparent !important;');
        $('#signButton').css('color','#FCAC45');
        $('#signButton').css('background-color', 'transparent !important;');
        $('.dropdown-menu', this).not('.in .dropdown-menu').stop( true, true ).slideDown("fast");
        $(this).toggleClass('open');        
	});

	$(document).on("mouseleave", ".dropdown", function(e) {
		e.preventDefault()
		//$('#special').css('background-color', 'transparent !important;'); 
        $('#signButton').css('color','#fff');
        $('#signButton').css('background-color', 'transparent !important;');   
    	$('.dropdown-menu', this).not('.in .dropdown-menu').stop( true, true ).slideUp("fast");
        $(this).toggleClass('open'); 
	});
}