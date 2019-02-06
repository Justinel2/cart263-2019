"use strict";

/*****************

******************/

let objects = [];
let $objects;
let $table;
let $sink;
let $recycling;
let $trash;

let totalDiscared = 0;
let wellRecycled = 0;
let notWashed = 0;
let wellTrashed = 0;
let displaced = 0;

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

  $("div > div > div > div", $objects).draggable({
    start: function(){

      $(this).animate({
        borderSpacing: -360 }, {
        step: function(now,fx) {
          $(this).css('transform','rotate('+now+'deg)');
        },
        duration:'slow'
      },'linear');

    },
    stop: function(){

        if (collision($(this),$table)) {
          return;
        }
        else if (collision($(this),$sink)) {
          $(this).css('color', 'rgb(68, 68, 68)');
          // $(this).addClass('washed');
        }
        else if (collision($(this),$recycling)) {
          calculateRecycling($(this));
          $(this).css('display', 'none');
        }
        else if (collision($(this),$trash)) {
          $(this).css('display', 'none');
          calculateTrash();
        }
      }
    })
  };


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

      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
      return true;
  }

  function calculateRecycling($this){
    totalDiscared++;

    if ($this.attr("id") == "1" || $this.attr("id") == "2" || $this.attr("id") == "3" || $this.attr("id") == "10"
    || $this.attr("id") == "11" || $this.attr("id") == "12" || $this.attr("id") == "13" || $this.attr("id") == "14"
    || $this.attr("id") == "15" || $this.attr("id") == "18" || $this.attr("id") == "19" || $this.attr("id") == "21"
    || $this.attr("id") == "22" || $this.attr("id") == "23") {
      if ($this.css('color') == 'rgb(68, 68, 68)') {
        wellRecycled++;
      }
      else {
        notWashed++;
      }
    }
    else {
      displaced++;
    }
  }

  function calculateTrash($this){
    totalDiscared++;

    if ($this.attr("id") == "0" || $this.attr("id") == "4" || $this.attr("id") == "5" || $this.attr("id") == "6"
    || $this.attr("id") == "7" || $this.attr("id") == "8" || $this.attr("id") == "9" || $this.attr("id") == "15"
    || $this.attr("id") == "16" || $this.attr("id") == "17" || $this.attr("id") == "20") {
      wellTrashed++;
    }
    else {
      displaced++;
    }
  }
