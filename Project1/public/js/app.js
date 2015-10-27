console.log("Sanity check !! It works dear <3 <3 <3");

$(document).ready(function (){
	 pageLoad();
});

function pageLoad(){
	checkAuth();
	$('#searchButton').on('click', function (event){
		event.preventDefault();
		var serialize = $(".search-form").serialize();
		console.log("the serialize thing is", serialize);
		$.post('/', serialize, function(response){
			console.log('the response contains', response);
			$('#lightbox').children().remove();
			$('#lightbox').css('height','1900px ');
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
			$('#ulNav').append('<li class="dropdown" id="special"><a href="#" class="page-scroll dropdown-toggle" data-toggle="dropdown" id="signButton">'+response.firstName+'<span class="caret"></span></a><ul class="dropdown-menu" role="menu"><li><a href="#">Profile</a></li><li class="divider"></li><li><a id="logOut" href="#">Log out</a></li></ul></li>')
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
					$('#ulNav').append('<li class="dropdown" id="special"><a href="#" class="page-scroll dropdown-toggle" data-toggle="dropdown">'+response.firstName+'<span class="caret"></span></a><ul class="dropdown-menu" role="menu"><li><a href="#">Profile</a></li><li class="divider"></li><li><a id="logOut" href="#">Log out</a></li></ul></li>')
					disappearForm($('#signUp').parent().parent());
					$('#field5').html('<label>Email Address<span class="req">*</span></label><input type="email" name ="email2" id= "email2" required autocomplete="off"/>');
					$('#field6').html('<label>Set A Password<span class="req">*</span></label><input type="password" name="password2" id="password2" required autocomplete="off"/>')
			
				} else if (response === 'wrong email') {
					swal("Error!", "This user doesn't exist, Try again !");
				} else if (response ==="password wrong") {
					swal("Error!", "Wrong password, Try again !")
				}
			})
		}
	})

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
	  				if (response == null) {
		  				$('#signButton').remove();
		  				$('#ulNav').append('<li><a  class="page-scroll" id="signButton">Sign In</a></li>')
	  				}
  				}); 
  				swal("logged Out!", "You are now logged out.", "success"); 
			}
		);	
	});

	function checkAuth(){
		$.get("/current_user", function(data){
			console.log('the user is : ', data);
			if(data.user){
				$('#signButton').remove();
				$('#ulNav').append('<li class="dropdown" id="special"><a href="#" class="page-scroll dropdown-toggle" data-toggle="dropdown" id="signButton">'+data.user.firstName+'<span class="caret"></span></a><ul class="dropdown-menu" role="menu"><li><a href="#">Profile</a></li><li class="divider"></li><li><a id="logOut" href="#">Log out</a></li></ul></li>')
			}else {

			}
			
		});
	}

	$('#logIn').on('click', function (event){
		event.preventDefault();
		if(($('#email2').val()==='') || ($('#password2').val()==='')){
			alert(' You should fill the information in the required fields. TRY AGAIN');
		}
		else {
			$.post('/users/:id', $('.form').serialize(), function (response) {
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

	//the dropdown nav : 
	$(document).on("mouseover", "#special", function(e) {
		e.preventDefault();
	    $('#special').css('background-color', 'transparent !important;');
        $('#signButton').css('color','#FCAC45');
        $('.dropdown-menu', this).not('.in .dropdown-menu').stop( true, true ).slideDown("fast");
        $(this).toggleClass('open');        
	});

	$(document).on("mouseleave", "#special", function(e) {
		e.preventDefault()
		//$('#special').css('background-color', 'transparent !important;'); 
        $('#signButton').css('color','#fff');   
    	$('.dropdown-menu', this).not('.in .dropdown-menu').stop( true, true ).slideUp("fast");
        $(this).toggleClass('open'); 
	});
}