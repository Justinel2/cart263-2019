"use strict";

/*****************

******************/

let objects = [];
let $objects;
let $table;
let $sink;
let $recycling;
let $trash;

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
// Sets the click handler and starts the time loop
function setup() {

  $table = $("div#table");
  $sink = $("div#sink");
  $recycling = $("div#recycling");
  $trash = $("div#trash");

  for (var i = 0; i < objects.length; i++) {
    $("#table").append('<div class="object" id="toIdentify">'+objects[i]+'</div>');
    $('#toIdentify').attr("id",i);
    $('#'+i).css({"margin-left": Math.floor((Math.random() * 50) + 1)+"%",
    "margin-top": Math.floor((Math.random() * 20) + 1)+"%",
    "transform": "rotate("+Math.floor((Math.random() * 359) + 1)+"deg)",
    "font-size": Math.floor((Math.random() * 11) + 10)+"px"});
  }

  $("div > div > div", $objects).draggable();
};

// $('#content').on('mouseover', '.master', function () {
//   // Make it draggable...
//   $(this).draggable({
//     // The start property takes a function that is called when dragging starts
//     start: function () {
//       // If they do start dragging it
//       // Now we can safely make the one we're dragging not the master
//       // $(this).removeClass('master');
//     },
//     // The stop property contains a function that is called when the dragging is stopped
//     // e.g. the mouse is released
//     stop: function () {
//       // Did they drag it far enough out of the interface area?
//       if ((Math.abs($(this).position().top) > $(window).height() * 0.85) && (Math.abs($(this).position().left) < 180)) {
//         // If not, then remove the dragged element entirely because it's not far enough onto the beach
//         $(this).remove();
//         // Return immediately to avoid the rest of this function
//         return;
//       }




      // If we get here, it was dragged onto th ebeach, so...
      //
      // // We can make it resizable (the CSS class, not the jQuery yet)
      // $(this).addClass('resizable');
      // $(this).resizable({
      //   aspectRatio: true, // Maintain the aspect ratio
      // });
      // // We need to explicitly call resizable with 'enable' in case
      // // this element had been disabled previously.
      // $(this).resizable('enable');

      // // When the user stops dragging, we should turn on the music
      // // if this is the first time they've interacted.
      // handleMusic();
      //
      // // Fade out the instructions
      // // (If they're already faded out, this won't do anything)
      // $('#instruction').addClass('fader');
    // }
  // });
// });
