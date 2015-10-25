console.log("Sanity check !! It works dear <3 <3 <3");

$(document).ready(function (){
	 pageLoad();
});

function pageLoad(){

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
				if(i%2 ===0){

					$('#lightbox').append('<div class="col-sm-6 col-md-3 col-lg-3 branding isotop-item" style="position: absolute; left: 0px; top: 0px; transform: translate3d(0px,'+j+'px, 0px);"><div class="portfolio-item"><div class="hover-bg"><a href="#"><div class="hover-text"><h4>'
						+response[i].title 
						+'</h4><small>'
						+ response[i].keywords[0].content 
						+'</small><div class="clearfix"></div><i class="fa fa-plus"></i></div><img src="'
						+ response[i].img 
						+'" class="img-responsive" alt="..."></a></div></div></div>');
				}else {
					$('#lightbox').append('<div class="col-sm-6 col-md-3 col-lg-3 photography app isotop-item" style="position: absolute; left: 0px; top: 0px; transform: translate3d(375px,'+j+'px, 0px);""><div class="portfolio-item"><div class="hover-bg"><a href="#"><div class="hover-text"><h4>'
						+response[i].title 
						+'</h4><small>'
						+ response[i].keywords[0].content 
						+'</small><div class="clearfix"></div><i class="fa fa-plus"></i></div><img src="'
						+ response[i].img 
						+'" class="img-responsive" alt="..."></a></div></div></div>');
					j+=290;
				}
				
			}
			

		})

	})

}