"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

let myAvatar;
let myFood;

// preload()
//
// Description of preload

function preload() {
}


// setup()
//
// Description of setup

function setup() {
  createCanvas(800,500);
  myAvatar = new Avatar(mouseX,mouseY,100,color(100,200,0),200,0.5);
  myFood = new Food(random(0,width),random(0,height),5,100);
}


// draw()
//
// Description of draw()

function draw() {
  background(0);
  myAvatar.update();
  if(myAvatar.checkOverlap(myFood)){
    myAvatar.eating(myFood);
  }


  myAvatar.display();
  myFood.display();
}
