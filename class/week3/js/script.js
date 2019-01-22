"use strict";

/*****************
Title of Project
Author Name
This is a template. You must fill in the title,
author, and this description to match your project!
******************/

function setup() {
  let reaction = document.getElementById("reaction");
  reaction.innerText = "surprised";
  let divs = document.getElementsByTagName("div");
  for (let i = 0; i < divs.length; i++) {
    divs[i].style.color = '#ff0000';
  }
  reaction.addEventListener('click',reactionClicked)
}

function reactionClicked(e) {
  e.target.innerText = "depressed";
}
