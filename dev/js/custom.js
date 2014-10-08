$(document).ready(function() {
	$('.carousel').carousel({
		interval: 8000,
//		pause: “hover”,
		wrap: true
	});

	var headerHeight = $('nav.navbar').height();
	headerHeight += 16;
//	$('.navbar a[href^="#"]').on('click', function(event) {
	$('a[href^="#"]').on('click', function(event) {
	    var target = $( $(this).attr('href') );
	    if( target.length ) {
	        event.preventDefault();
	        $('html, body').animate({
	            scrollTop: target.offset().top - headerHeight
	        }, 1000);
	    }

	});

	$('#tabs').tab();

});