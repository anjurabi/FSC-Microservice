

// Menu button click event
$('#menu-btn').on('click', function(e) {
	e.preventDefault();
	
	// Load menu page using AJAX
	$('main').load('menu.html');
});

// Reservation button click event
$('#reservation-btn').on('click', function(e) {
	e.preventDefault();
	
	// Load reservation page using AJAX
	$('main').load('reservation.html');
});

// Contact button click event
$('#contact-btn').on('click', function(e) {
	e.preventDefault();
	
	// Load contact page using AJAX
	$('main').load('contact.html');
});

// Reservation link click event
$('#reservation-link').on('click', function(e) {
	e.preventDefault();
	
	// Open reservation modal
	// (code for the reservation modal goes here)
});
