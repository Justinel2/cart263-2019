"use strict";

/*****************

******************/

let $objects = [];
let $table;
let $sink;
let $recycling;
let $trash;

$objects[0] = "dogs hair";
$objects[1] = "milk carton";
$objects[2] = "soda can";
$objects[3] = "egg carton";
$objects[4] = "tea bag";
$objects[5] = "banana peel";
$objects[6] = "apple core";
$objects[7] = "receipt";
$objects[8] = "dirty diaper";
$objects[9] = "cat liter";
$objects[10] = "paper";
$objects[11] = "beer bottle";
$objects[12] = "cereal box";
$objects[13] = "newspaper";
$objects[14] = "soup can";
$objects[15] = "old fish";
$objects[16] = "used tissue";
$objects[17] = "tattered sock";
$objects[18] = "gift wrapping";
$objects[19] = "sticky note";
$objects[20] = "lasagna";
$objects[21] = "water bottle";
$objects[22] = "bubble wrap";
$objects[23] = "big box";

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

  for (var i = 0; i < $objects.length; i++) {
    $("#table").append('<div class="object" id="toIdentify">sink</div>');
    $('#toIdentify').attr("id",i);
    $('#'+i).css({"position": "absolute",
    "margin-left": Math.floor((Math.random() * 50) + 1)+"%",
    "margin-top": Math.floor((Math.random() * 20) + 1)+"%",
    "transform": "rotate("+Math.floor((Math.random() * 359) + 1)+"deg)"});
  }

};
