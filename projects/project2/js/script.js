"use strict";

/*****************

******************/

// Variables
let $signInPage;
let $homePage;
let $fourChanPage;
let $journalPage;
let $scorePage;

let $restartButton;
let $offButton;

// When the document is loaded we call the setup function
$(document).ready(setup);


// setup()
//
// Function initiating the program
function setup() {

  $signInPage = $("#signin");
  $scorePage = $("#score");

  $restartButton = $("#restart");
  $offButton = $("turnoff");

  $restartButton.on('click',restartGame);
  $restartButton.on('click',turnOffGame);
  };

function restartGame() {
  // script.restart();
}

function turnOffGame() {
  $scorePage.css('display','initial');
}

// startGame()
//
// A function that hides the introduction page when the start button is clicked.
// By that, the gameplay is visible (z-index)
// function startGame(){
//   $('.intro').css('display', 'none');
// }
