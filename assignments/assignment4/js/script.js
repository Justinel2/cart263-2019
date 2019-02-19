"use strict";

/*****************

Eat Up
Pippin Barr

modified by Justine Lardeux (40030920)

Using jQuery UI's draggable and droppable methods to
feed a hungry mouth!

Sounds:
Buzzing: https://freesound.org/people/soundmary/sounds/194931/
Chewing: https://freesound.org/people/InspectorJ/sounds/412068/

******************/

// Sound effects for the experience
let buzzSFX = new Audio("assets/sounds/buzz.mp3");
let crunchSFX = new Audio("assets/sounds/crunch.wav");
let chachingSFX = new Audio("assets/sounds/chaching.wav");

// Variable to hold our two key elements
let $mouth;
let $fly;
let $cent;

$(document).ready(setup);

function setup() {

  // Get the fly element from the page
  $fly = $('#fly');
  // Make it draggable
  $fly.draggable();

  // Get the cent element from the page
  $cent = $('#cent');
  // Make it draggrable
  $cent.draggable({
    // The revert option specifies that the element always returns to its original
    // position when the drag is finished
    revert: "invalid",
    // The start option specifies a function to call when the object is draggued
    start: centDraggued
  });

  // Get the mouth element from the page
  $mouth = $('#mouth');
  // Make it droppable
  $mouth.droppable({
    // The accept element specifies the only elements that can be dropped on the mouth
    // In this case, just the fly
    accept: $fly,
    // The drop option specifies a function to call when a drop is completed
    drop: flyDropped
  });

  // Start up the buzzing of the fly
  buzzSFX.loop = true;
  buzzSFX.play();
}


// flyDropped(event,ui)
//
// Called when a fly element is dragged over the droppable element (the mouth)
// The arguments 'event' and 'ui' are automatically passed by jQuery UI and contain
// helpful information about the event.
function flyDropped (event,ui) {
  // When we drop the fly into the mouth we should remove the fly from the page
  // ui contains a reference to the draggable element that was just dropped in ui.draggable
  // .remove() removes the select element from the page
  ui.draggable.remove();
  // We should "close the mouth" by changing its image
  // .attr() lets us change specific attributes on HTML element by specifying the attribute
  // and then what we want to set it to - in this case the 'src' attribute to the closed image
  $(this).attr('src','assets/images/mouth-closed.png');
  // Now the fly is gone we should stop its buzzing
  buzzSFX.pause();
  // And start the crunching sound effect of chewing
  crunchSFX.play();
  // Use a setInterval to call the chew() function over and over
  setInterval(chew,250);
}

// centDraggued(event,ui)
//
// Called when a cent is draggued from its original position
function centDraggued(event,ui) {
  // Plays the "cha ching" sound effect
  chachingSFX.play();
}
// chew()
//
// Swaps the mouth image between closed and open and plays the crunching SFX
function chew () {
  // We can use .attr() to check the value of an attribute to
  // In this case we check if the image is the open mouth
  if ($mouth.attr('src') === 'assets/images/mouth-open.png') {
    // If it is, we set the 'src' attribute to the closed mouth
    $mouth.attr('src','assets/images/mouth-closed.png');
    // and play the crunching
    crunchSFX.play();
  }
  else {
    // Otherwise the 'src' attribute must have been the closed mouth
    // so we swap it for the open mouth
    $mouth.attr('src','assets/images/mouth-open.png');
  }
}
