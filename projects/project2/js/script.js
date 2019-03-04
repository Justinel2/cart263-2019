"use strict";

/*****************

******************/

// Variables
let $signInPage;
let $homePage;
let $webPage;
let $journalPage;
let $scorePage;

let $restartButton;
let $offButton;
let $internetButton;
let $journalButton;
let $closeButton;

let n = 0;

// When the document is loaded we call the setup function
$(document).ready(setup);


// setup()
//
// Function initiating the program
function setup() {

  $signInPage = $("#signin");
  $homePage = $("#home");
  $webPage = $("#fourchan");
  $journalPage = $("#post");
  $scorePage = $("#score");

  $restartButton = $(".game-button#restart");
  $offButton = $(".game-button#turnoff");
  $internetButton = $(".game-button#internet");
  $journalButton = $(".game-button#journal");
  $closeButton = $(".close");

  $('#sign-in-button').on('click',signIn);
  $restartButton.on('click', restartGame);
  $offButton.on('click', turnOffGame);
  $internetButton.on('click', openInternet);
  $journalButton.on('click', openJournal);
  $closeButton.on('click', closePage);

}

function restartGame() {
  console.log("restart");
}

function turnOffGame() {
  console.log("turnoff-show score!");
  $scorePage.css('display','block');
}

function signIn() {
  $signInPage.css('display','none');
  $homePage.css('display','block');
}

function openInternet() {
  $homePage.css('display', 'none');
  $webPage.css('display', 'block');

}

function openJournal() {
  $journalPage.css('display', 'block');
}

function closePage() {
  $(this).parent().parent().css('display', 'none');
}

// startGame()
//
// A function that hides the introduction page when the start button is clicked.
// By that, the gameplay is visible (z-index)
// function startGame(){
//   $('.intro').css('display', 'none');
// }
