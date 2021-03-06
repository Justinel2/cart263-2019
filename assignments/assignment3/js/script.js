"use strict";

/*****************

Raving Redactionist
Pippin Barr

modified by Justine Lardeux for Assignment 3

You are redacting a document, but it keeps coming unredacted!
Click the secret information to hide it, don't let all the
secrets become revealed!

******************/

// A place to store the jQuery selection of all spans
let $spans;

/////////////NEW////////////
let $secretCount = 0;
let $secrets;
////////////////////////////

// When the document is loaded we call the setup function
$(document).ready(setup);

// setup()
//
// Sets the click handler and starts the time loop
function setup() {
  // Save the selection of all spans (since we do stuff to them multiple times)
  $spans = $('span.redacted');
  // Set a click handler on the spans (so we know when they're clicked)
  $spans.on('click',spanClicked);
  // Set an interval of 500 milliseconds to update the state of the page
  setInterval(update,500);

  /////////////NEW////////////
  // Set an event to find the secret words on mouseover
  $secrets = $("span.secret");
  $secrets.on('mouseover',spanHover);

  $("div.end").on('click',restart);
  ////////////////////////////
};

/////////////NEW////////////
// spanHover()
//
// Add a .found class to the element that was moused over so it highlights
// Remove the mouseover event from the found element
// Increase $secretCount by one
// Select the secret-count span and et its text to be the value of the counter variable
// When all the 7 secrets are found, prompt the countFinished() function
function spanHover() {
  $(this).addClass('found');
  $(this).off();
  $secretCount++;
  $("span#secret-count").text($secretCount);
  if ($secretCount >= 7) {
    countFinished();
  }
}
////////////////////////////

// spanClicked()
//
// When a span is clicked we remove its revealed class and add the redacted class
// thus blacking it out
function spanClicked() {
  $(this).removeClass('revealed');
  $(this).addClass('redacted');
}

// update()
//
// Update is called every 500 milliseconds and it updates all the spans on the page
// using jQuery's each() function which calls the specified function on _each_ of the
// elements in the selection
function update() {
  $spans.each(updateSpan);
}

// updateSpan()
//
// With a probability of 10% it unblanks the current span by removing the
// redacted class and adding the revealed class. Because this function is called
// by each(), "this" refers to the current element that each has selected.
function updateSpan() {
  let r = Math.random();
  if (r < 0.1) {
    $(this).removeClass('redacted');
    $(this).addClass('revealed');
  }
}

/////////////NEW////////////

// countFinished()
//
// slide the current text to the top to give place to the ending page
function countFinished() {
  $("div.text").slideUp(2000);
}

// restart()
//
// When a response is clicked, the game paragraphs slide down, the secretCount
// is back to zero, the spans are also all at their original states.
function restart() {
  $("div.text").slideDown(2000);
  $secretCount = 0;
  $secrets.removeClass('found');
  spanClicked();
}
////////////////////////////
