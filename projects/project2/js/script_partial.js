"use strict";

/*****************

******************/

// Variables
var href;


// When the document is loaded we call the setup function
$(document).ready(setup);


// setup()
//
// Function initiating the program
function setup() {

  var content;
  var link;
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = "http://boards.4channel.org/"; // site that doesn’t send Access-Control-*
  fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
  .then((res) => {
      return res.text();
  })
  .then((data) => {
    content = String(data);
    console.log(content);
    $('#para').html(content);
    comments = $("blockquote.postMessage").text();
    console.log(String(comments));
    $(function(){
      $('a').each(function() {
        $(this).attr('href', ' ');
      });
    });
   })
  .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

  };


// startGame()
//
// A function that hides the introduction page when the start button is clicked.
// By that, the gameplay is visible (z-index)
// function startGame(){
//   $('.intro').css('display', 'none');
// }
