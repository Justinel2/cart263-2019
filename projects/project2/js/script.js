"use strict";

/*****************

******************/

// Variables

const proxyurl = "https://cors-anywhere.herokuapp.com/";
var content;
var comments;
var dataString;
var baseURL = "http://boards.4channel.org/";
var url;
var links = ["a", "c", "g", "k", "m", "o", "p", "v", "vg", "vr",
             "w", "vip", "qa", "cm", "lgbt", "3", "adv", "an",
             "asp", "biz", "cgl", "ck", "co", "diy", "fa", "fit",
             "gd", "his", "int", "jp", "lit", "mlp", "mu", "n",
             "news", "out", "po", "qst", "sci", "sp", "tg", "toy",
             "trv", "tv", "vp", "wsg", "wsr", "x"];
var browserOpen = false;
var generation = false;

var markov;
var lines;
var textToMarkov = "";

let $signInPage;
let $homePage;
let $webPage;
let $journalPage;
let $scorePage;

let $restartButton;
let $offButton;
let $internetButton;
let $journalButton;
let $closeWebPageButton;
let $closeJournalButton;


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
  $closeWebPageButton = $("#close-web");
  $closeJournalButton = $("#close-journal");

  $('#sign-in-button').on('click',signIn);
  $restartButton.on('click', restartGame);
  $offButton.on('click', turnOffGame);
  $internetButton.on('click', openInternet);
  $journalButton.on('click', openJournal);
  $closeWebPageButton.on('click', closeWebPage);
  $closeJournalButton.on('click', closeJournal);

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
    generateRandomURL();
    generateWebPage();
    generateMarkov();
    generateJournalEntry();
    browserOpen = true;
  }
}

function openJournal() {
  $journalPage.css('display', 'block');
}

function closeWebPage() {
  $webPage.css('display', 'none');
}

function closeJournal() {
  $journalPage.css('display', 'none');
}

function generateRandomURL() {
  var number = Math.floor(Math.random() * 48);
  url = baseURL + "/" + links[number] + "/";
}

function generateWebPage() {
  fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
  .then((res) => {
      return res.text();
  })
  .then((data) => {
    content = String(data);
    console.log(content);
    $('#para').html(content);
    comments = $("blockquote.postMessage").text();
    // console.log(String(comments));
    textToMarkov += comments;
    console.log(textToMarkov);
    $(function(){
      $('a').each(function() {
        $(this).attr('href', ' ');
      });
    });
   })
  .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}


function generateMarkov() {
  // console.log("generating markov?");
  markov = new RiMarkov(3);
  $('textarea').click(generate);
}

function generate() {
  // console.log("enters in generate");
  textToMarkov =
  markov.loadText(textToMarkov);
  // console.log("comments: " + comments);
  if (!markov.ready()) return;
  lines = markov.generateSentences(5);
  dataString = lines.join(' ');

  for (var i = 0; i <= 20000000; i++) {
    // var r = " > > " + String(i);
    dataString = dataString.replace(String(i),"");
  }
  dataString = dataString.replace(" >","");
  dataString = dataString.replace(">","");
  dataString = dataString.replace(" > ","");
  console.log(dataString);
}


function generateJournalEntry() {
  (function($) {
    var i = 0;
    $('textarea').keyup(function (e){
      var prev = "";
      if (i < dataString.length) {
        for (var j = 0; j < i; j++) {
          prev += dataString[j];
        }
        $(this).val(prev + dataString[i]);
        i++;
      }
      if (i >= dataString.length) {
        generation = true;
      }
      console.log(generation);
    })
  })(jQuery);
}

function handlePostEntry(){

}
