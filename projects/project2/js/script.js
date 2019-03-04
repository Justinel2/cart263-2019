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

var markov;
var lines;

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
    generateRandomURL();
    generateWebPage();
    generateMarkov();
    generateJournalEntry();
    browserOpen = true;
  }
}

function generateMarkov() {
  console.log("generating markov?");
  markov = new RiMarkov(4);

  RiTa.loadString('../assets/texts/kafka.txt', function (data1) {
     RiTa.loadString('../assets/texts/wittgenstein.txt', function (data2) {
       markov.loadText(data1);
       markov.loadText(data2);
     });
   });
   dataString = "click to regenerate";
  console.log(dataString);
  // generate();
  $('textarea').click(generate);
}

function generate() {
  console.log("enters in generate");
  if (!markov.ready()) return;
  console.log(dataString);
  dataString = markov.generateSentences(10);
  console.log(dataString);

  // $('#para').text(lines.join(' '));
  // $('.textarea').css('align-items', 'stretch');
}

function openJournal() {
  $journalPage.css('display', 'block');
}

function closePage() {
  $(this).parent().parent().css('display', 'none');
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
    console.log(String(comments));
    $(function(){
      $('a').each(function() {
        $(this).attr('href', ' ');
      });
    });
   })
  .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
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
    })
  })(jQuery);
}
