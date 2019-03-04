"use strict";

/*****************

******************/

// Variables

const proxyurl = "https://cors-anywhere.herokuapp.com/";
var content;
var url = "http://boards.4channel.org/";
var links = ["a", "c", "g", "k", "m", "o", "p", "v", "vg", "vr",
             "w", "vip", "qa", "cm", "lgbt", "3", "adv", "an",
             "asp", "biz", "cgl", "ck", "co", "diy", "fa", "fit",
             "gd", "his", "int", "jp", "lit", "mlp", "mu", "n",
             "news", "out", "po", "qst", "sci", "sp", "tg", "toy",
             "trv", "tv", "vp", "wsg", "wsr", "x"];
var browserOpen = false;

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
  $webPage.css('display', 'block');

  if (browserOpen === false) {
    generateWebPage();
    browserOpen = true;
  }
}

function openJournal() {
  $journalPage.css('display', 'block');
  // NOT IN OPEN JOURNAL if (browserOpen >= 1)... do it + end the day + put all to 0
}

function closePage() {
  $(this).parent().parent().css('display', 'none');
}

function generateWebPage() {
  console.log("generate");
  fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
  .then((res) => {
      return res.text();
  })
  .then((data) => {
    content = String(data);
    console.log(content);
    $('#para').html(content);
    $(function(){
      $('a').each(function() {
        $(this).attr('href', ' ');
      });
    });
   })
  .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

// startGame()
//
// A function that hides the introduction page when the start button is clicked.
// By that, the gameplay is visible (z-index)
// function startGame(){
//   $('.intro').css('display', 'none');
// }
