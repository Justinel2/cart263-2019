"use strict";

$(document).ready(setup);

function setup() {
  // This code will run when the document is ready!
  console.log("document is ready!");
  let $divs = $('div');
  $divs.hide();
  $divs.fadeIn(2000);

  $divs.on('click',divClicked);
  // ALTERNATIVE WITH ANONYMOUS FUNCTION
  //$divs.on('click',function(){
  //$(this).fadeOut();
  //}); and remove the function under
}

function divClicked(){
  $(this).fadeOut();
}

/*********************************************
ALTERNATE WAYS:

--------*selection and action in one*-------
$(document).ready(function() {
  // This code will run when the document is ready!
  console.log("document is ready!");
  $('div').hide();
  $('div').fadeIn(2000);
});

-------*chaining effect-------
$(document).ready(function() {
// This code will run when the document is ready!
console.log("document is ready!");
$('div')
.hide()
.fadeIn(2000);
});
**********************************************/
