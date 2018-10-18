//= require jquery-1.7.2.min.js
//= require bootstrap.min.js
//= require_self

$(document).ready( function() {
/********************************************************************************/

  if ( document.location.pathname != '/' ) $('.navbar ul.nav > li > a[href^="' + document.location.pathname + '"]').parent('li').addClass('active')

  $('.dict').html("phil•ip hall•strom |'filip 'hôlsträm|")

  $('a[rel=offline]').attr('target', '').attr('href', '#').popover({content:"<strong>Sorry, this website is no longer online.</strong>", trigger:'hover'})


/********************************************************************************/
});
