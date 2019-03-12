"use strict";

/*****************

******************/

// Variables

const proxyurl = "https://cors-anywhere.herokuapp.com/";
var content;
var comments;
var dataString;
var baseURL = "http://boards.4channel.org";
var url;
var links = ["a", "c", "g", "k", "m", "o", "p", "v", "vg", "vr",
             "w", "vip", "qa", "cm", "lgbt", "3", "adv", "an",
             "asp", "biz", "cgl", "ck", "co", "diy", "fa", "fit",
             "gd", "his", "int", "jp", "lit", "mlp", "mu", "n",
             "news", "out", "po", "qst", "sci", "sp", "tg", "toy",
             "trv", "tv", "vp", "wsg", "wsr", "x"];
var browserOpen = false;
var generation = false;
var journalEntryWritten = false;

var day;
var archive = new Array(0);
var currentArchive;

var markov;
var lines;
var textToMarkov = "";

let $signInPage;
let $homePage;
let $webPage;
let $journalPage;
let $instructionPage;
let $scorePage;
let $scorePageEntry;

let $textarea;
let $webarea;

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
  $instructionPage = $("#restart-quit");
  $scorePage = $("#score");
  $scorePageEntry = $('#score p');

  $textarea = $('textarea');
  $webarea =   $('#para');

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
  browserOpen = false;
  generation = false;
  journalEntryWritten = false;
  $instructionPage.css('display','none');
  closeWebPage();
  closeJournal();
  generateWebPage();
  console.log(String(url));
  archive.push($textarea.val());
  $textarea.val("");
  day++;
  $signInPage.css('display','block');
}

function turnOffGame() {
  restartGame();
  // archive += [];
  $signInPage.css('display','none');
  $scorePage.css('display','block');
  console.log(archive);
  for (var k = archive.length-1; k >= 0; k--) {
    day = k+1;
    $scorePageEntry.last().after('<p span id= "day"> Day '+ day + '<p>' + archive[k] + '</p>');
  }
}

function signIn() {
  $signInPage.css('display','none');
  $homePage.css('display','block');
  $instructionPage.css('display','none');
}

function openInternet() {
  $webPage.css('display', 'block');

  if (browserOpen === false) {
    // generateRandomURL();
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
  if (journalEntryWritten === false) {
    $journalPage.css('display', 'none');
  }
  if (journalEntryWritten === true) {
    $instructionPage.css('display', 'block');
  }
}

// function generateRandomURL() {
//   var number = Math.floor(Math.random() * 48);
//   url = baseURL + "/" + links[number] + "/";
// }

function generateWebPage() {

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      console.log(this.readyState);
      if (this.readyState === 4 && this.status === 200) {
        content = this.responseText;
        console.log(content);
        $webarea.html(content);
        comments = $("blockquote.postMessage").text();
        textToMarkov += comments;
        console.log(textToMarkov);
        $(function(){
          $('a').each(function() {
            $(this).attr('href', ' ');
          });
        });
      }
    }
    xhr.open("GET", "https://cors-anywhere.herokuapp.com/http://boards.4channel.org/" + links[(Math.floor(Math.random() * 48))] + "/");
    xhr.send();

  // //
  // fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
  // .then((res) => {
  //     return res.text();
  // })
  // .then((data) => {
  //   content = String(data);
  //   console.log(content);
  //   $('#para').html(content);
  //   comments = $("blockquote.postMessage").text();
  //   textToMarkov += comments;
  //   console.log(textToMarkov);
  //   $(function(){
  //     $('a').each(function() {
  //       $(this).attr('href', ' ');
  //     });
  //   });
  //  })
  // .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}


function generateMarkov() {
  // console.log("generating markov?");
  markov = new RiMarkov(3);
  $journalPage.click(generate);
}

function generate() {
  if (generation === false) {
    markov.loadText(textToMarkov);
    if (!markov.ready()) return;
    lines = markov.generateSentences(5);
    dataString = lines.join(' ');

    for (var i = 0; i <= 20000000; i++) {
      dataString = dataString.replace(String(i),"");
    }
    dataString = dataString.replace(" >","");
    dataString = dataString.replace(">","");
    dataString = dataString.replace(" > ","");
    console.log(dataString);
    generation = true;
    console.log(generation);
  }
}


function generateJournalEntry() {
  (function($) {
    var i = 0;
    $textarea.keyup(function (e){
      var prev = "";
      if (i < dataString.length) {
        for (var j = 0; j < i; j++) {
          prev += dataString[j];
        }
        $(this).val(prev + dataString[i]);
        i++;
      }
      if (i >= dataString.length) {
        journalEntryWritten = true;
      }
    })
  })(jQuery);
}
