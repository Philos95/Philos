
/*!
 * Sidebar menu for Bootstrap 4
 * Copyright ZdenÄ›k PapuÄŤĂ­k
 * MIT License
*/
(function($) {

	// toggle sidebar menu
	$('#sidebar').on('click', function() {
    $('#wrapper').toggleClass('toggle');
    if($('#wrapper').hasClass('toggle')){
      $("#sidebar").html("<i class='fas fa-angle-double-right'></i>");
    }else{
      $("#sidebar").html("<i id='sidebarToggle' class='fas fa-angle-double-left'></i>");
    }
   
	});

	// init menu
	$('ul.menu li').each(function() {
		$(this).parent().find('li.parent a.employ').addClass('up');
		if ($(this).children('li.parent a.current').length > 0 ) {
			$(this).parent().find('ul.submenu').toggle();
			$(this).parent().find('li.parent a.employ').addClass('active down');
		}
	});

	// active menu
	$('ul.menu li a').on('click', function() {
		$(this).parent('li.parent').find('a.employ').toggleClass('active');
		$(this).parent().find('ul.submenu').slideToggle('fast');
		$(this).parent().find('ul.submenu ul.submenu').toggle();
	});

	// click transition
	$('a.employ').on('click', function() {
		$(this).addClass('transition');
		$(this).toggleClass('rotate');
	});

}(jQuery));