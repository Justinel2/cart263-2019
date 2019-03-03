"use strict";

/*****************

******************/

// Variables
$restartButton;
$offButton;

// When the document is loaded we call the setup function
$(document).ready(setup);


// setup()
//
// Function initiating the program
function setup() {
  let $restartButton = $("#restart");
  let $offButton = $("turnoff");

  $restartButton.on('click',restartGame);
  $restartButton.on('click',turnOffGame);
  };

function restartGame() {
  Program.restart();
}


// startGame()
//
// A function that hides the introduction page when the start button is clicked.
// By that, the gameplay is visible (z-index)
// function startGame(){
//   $('.intro').css('display', 'none');
// }
