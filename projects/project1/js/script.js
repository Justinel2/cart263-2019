"use strict";

/*****************

I AM NOT AGAINST RECYCLING
By Justine Lardeux (40030920)

This program differenciates the different items to discard. The user can place those items in the
sink (to clean), in the recycling and in the trash. When all the items are sorted, the trashes
are sent to be processed...

******************/

// Variables

//Array containing the different items to sort
let objects = [];
// variable representing the .object class in the html and CSS
let $objects;
// variable representing the .table class (div) in the html and CSS
let $table;
// variable representing the .sink class (div) in the html and CSS
let $sink;
// variable representing the .recycling class (div) in the html and CSS
let $recycling;
// variable representing the .trash class (div) in the html and CSS
let $trash;

// Variables for the scoring
let totalDiscarded = 0;
let wellRecycled = 0;
let notWashed = 0;
let wellTrashed = 0;
let displaced = 0;

// Items in the array
objects[0] = "dogs hair";
objects[1] = "milk carton";
objects[2] = "soda can";
objects[3] = "egg carton";
objects[4] = "tea bag";
objects[5] = "banana peal";
objects[6] = "apple core";
objects[7] = "receipt";
objects[8] = "dirty diaper";
objects[9] = "cat liter";
objects[10] = "paper";
objects[11] = "beer bottle";
objects[12] = "cereal box";
objects[13] = "newspaper";
objects[14] = "soup can";
objects[15] = "old fish";
objects[16] = "used tissue";
objects[17] = "tattered sock";
objects[18] = "gift wrapping";
objects[19] = "sticky note";
objects[20] = "lasagna";
objects[21] = "water bottle";
objects[22] = "bubble wrap";
objects[23] = "big box";

// When the document is loaded we call the setup function
$(document).ready(setup);


// setup()
//
// Function initiating the program
function setup() {

  // variable representing the water sound effect
  var waterSoundFX = document.createElement("audio");

  waterSoundFX.src = "../assets/sounds/water.wav";
  waterSoundFX.volume = .2;
  waterSoundFX.autoPlay = false;
  waterSoundFX.preLoad = true;
  waterSoundFX.controls = true;

  // variable representing the water sound effect
  var trashSoundFX = document.createElement("audio");

  waterSoundFX.src = "../assets/sounds/trash.wav";
  waterSoundFX.volume = .2;
  waterSoundFX.autoPlay = false;
  waterSoundFX.preLoad = true;
  waterSoundFX.controls = true;

  // Definition of the variables that represent elements of HTML
  $table = $("div#table");
  $sink = $("div#sink");
  $recycling = $("div#recycling");
  $trash = $("div#trash");

  // Displaying each item in the array with a for loop
  for (var i = 0; i < objects.length; i++) {
    // Add the item and give it a class .object and a id #toIdentify
    $("#table").append('<div class="object" id="toIdentify">'+objects[i]+'</div>');
    // Modify the id #toIdentify to the position of the item on the array
    $('#toIdentify').attr("id",i);
    // Give the item a random x and y position inside the 'table' div, a random
    // font-size and a random orientation
    $('#'+i).css({"margin-left": Math.floor((Math.random() * 50) + 1)+"%",
    "margin-top": Math.floor((Math.random() * 20) + 1)+"%",
    "transform": "rotate("+Math.floor((Math.random() * 359) + 1)+"deg)",
    "font-size": Math.floor((Math.random() * 11) + 10)+"px"});
  }
  // Start the game by clicking on the button
  $('#start').on('click',startGame);
  // Give draggable property to each item
  $("div > div > div > div", $objects).draggable({
    // The start property takes a function that is called when dragging starts
    start: function(){
      // If they do start dragging the items
      // The item rotate so that it places itself horizontally aligned
      $(this).animate({
        borderSpacing: -360 }, {
        step: function(now,fx) {
          $(this).css('transform','rotate('+now+'deg)');
        },
        duration:'slow'
      },'linear');

    },
    // The stop property contains a function that is called when the dragging is stopped
      // e.g. the mouse is released
    stop: function(){

        // Check overlap with sections
        // If there is overlap of the item and the table
        if (collision($(this),$table)) {
          // Do nothing
          return;
        }
        // If there is overlap of the item and the sink
        else if (collision($(this),$sink)) {
          // Change the color of the font to grey
          $(this).css('color', 'rgb(68, 68, 68)');
          // Play water sound effect
          waterSoundFX.play();
        }
        // If there is overlap of the item and the recycling bin
        else if (collision($(this),$recycling)) {
          // Calculate the score for the recycling
          calculateRecycling($(this));
          // Hide the item
          $(this).css('display', 'none');
          // Play trash sound effect
          waterSoundFX.play();
        }
        // If there is overlap of the item and the trash can
        else if (collision($(this),$trash)) {
          // Hide the item
          $(this).css('display', 'none');
          // Calculate the score for the trash
          calculateTrash($(this));
          // Play trash sound effect
          waterSoundFX.play();
        }
        // If all the items are discarded, display the score
        if (totalDiscarded >= objects.length) {
          displayPoints();
        }
      }
    })
  };

// startGame()
//
// A function that hides the introduction page when the start button is clicked.
// By that, the gameplay is visible (z-index)
function startGame(){
  $('.intro').css('display', 'none');
}

// collision()
//
// A function that calculates if two divs are overlapping
function collision($div1, $div2) {
      var x1 = $div1.offset().left;
      var y1 = $div1.offset().top;
      var h1 = $div1.outerHeight(true);
      var w1 = $div1.outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = $div2.offset().left;
      var y2 = $div2.offset().top;
      var h2 = $div2.outerHeight(true);
      var w2 = $div2.outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;

      // If the two divs are overlapping, the function returns true
      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
      return true;
  }

// calculateRecycling()
//
// A function that verifies if the item thrown in the recycling is recyclable and washed.
// The function returns the scores.
function calculateRecycling($this){
    // If the item was recyclable
    if ($this.attr("id") == "1" || $this.attr("id") == "2" || $this.attr("id") == "3" || $this.attr("id") == "10"
    || $this.attr("id") == "11" || $this.attr("id") == "12" || $this.attr("id") == "13" || $this.attr("id") == "14"
    || $this.attr("id") == "15" || $this.attr("id") == "18" || $this.attr("id") == "19" || $this.attr("id") == "21"
    || $this.attr("id") == "22" || $this.attr("id") == "23") {
      // If the item was washed
      if ($this.css('color') == 'rgb(68, 68, 68)') {
        // The item is well recycled
        wellRecycled++;
      }
      else {
        // The item was recyclable but has not been washed
        notWashed++;
      }
    }
    else {
      // The item was not recyclabled
      displaced++;
    }
    // Add one point to the total of items discarded
    totalDiscarded++;
}

// calculateTrash()
//
// A function that verifies if the item thrown in the trash was recyclable.
// The function returns the scores.
function calculateTrash($this){
    // If the item is not recyclable
    if ($this.attr("id") == "0" || $this.attr("id") == "4" || $this.attr("id") == "5" || $this.attr("id") == "6"
    || $this.attr("id") == "7" || $this.attr("id") == "8" || $this.attr("id") == "9" || $this.attr("id") == "15"
    || $this.attr("id") == "16" || $this.attr("id") == "17" || $this.attr("id") == "20") {
      // The item was trash and has been thrown accordingly
      wellTrashed++;
    }
    else {
      // The item was recyclable and has been thrown in the trash
      displaced++;
    }
    // Add one point to the total of items discarded
    totalDiscarded++;
}

// displayPoints()
//
// A function that displays the end page with the points and where the recycling actually goes
function displayPoints() {
    // Hide the container (contains the gameplay)
    $(".container").css('display','none');
    // She the end page
    $(".final").show();
    // Add the score as paragraphs
    $(".final").append('<p>Items well recycled:'+wellRecycled+'</p>');
    $(".final").append('<p>Items well trashed:'+wellTrashed+'</p>');
    $(".final").append('<p>Items not washed before recycled:'+notWashed+'</p>');
    $(".final").append('<p>Items misplaced:'+displaced+'</p>');
    $(".final").append('<p>Total amount of items:'+totalDiscarded+'</p>');
}
