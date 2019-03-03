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

let n = 0;

// When the document is loaded we call the setup function
$(document).ready(setup);


// setup()
//
// Function initiating the program
function setup() {

  $signInPage = $("#signin");
  $homePage = $("#home");
  $scorePage = $("#score");

  $restartButton = $("#restart");
  $offButton = $("#turnoff");

  $restartButton.on('click',restartGame);
  $restartButton.on('click',turnOffGame);

  $('#sign-in-button').on('click',signIn);
}

function restartGame() {
  // script.restart();
}

function turnOffGame() {
  $scorePage.css('display','block');
}

function signIn() {
  $signInPage.css('display','none');
  $homePage.css('display','block');
}


// startGame()
//
// A function that hides the introduction page when the start button is clicked.
// By that, the gameplay is visible (z-index)
// function startGame(){
//   $('.intro').css('display', 'none');
// }
