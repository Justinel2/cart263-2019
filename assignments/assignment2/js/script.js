"use strict";

/*****************

OOP Circle Eater
Pippin Barr

ASSIGNMENT 2
modified by Justine Lardeux (40030920)

An Object-Oriented version of the Circle Eater program.
The player moves a circle around with the mouse.
Another circle represents food which the player eats by overlapping.
The player circle shrinks over time, but grows when it eats.

******************/

// Constants for key quantities
const AVATAR_MAX_SIZE = 64;
const AVATAR_SIZE_LOSS_PER_FRAME = 1;
const FOOD_MIN_SIZE = 5;
const FOOD_MAX_SIZE = 100;
/////////// NEW ///////////
const FOOD_MAX_SPEED = 10;
const FOOD_AMOUNT = 15;
///////////////////////////

// Variables to store the two key objects
let avatar;
/////////// NEW ///////////
let food = [];
///////////////////////////


// preload()
//
// Not needed

function preload() {

}


// setup()
//
// Create the canvas, avatar, and food, disable the cursor

function setup() {
  createCanvas(windowWidth,windowHeight);
  avatar = new Avatar(mouseX,mouseY,AVATAR_MAX_SIZE,AVATAR_SIZE_LOSS_PER_FRAME)
  /////////// NEW ///////////
  for(let i=0;i<FOOD_AMOUNT;i++){
    food.push(new Food(random(0,width),random(0,height),FOOD_MIN_SIZE,FOOD_MAX_SIZE,FOOD_MAX_SPEED));
  }
  ///////////////////////////
  noCursor();
}


// draw()
//
// Clear the background
// Update the avatar and check for eating
// Display the avatar and food

function draw() {
  background(0);

  avatar.update();

  /////////// NEW ///////////
  for(let i=0;i<food.length;i++){
      food[i].update();
      if (avatar.collide(food[i])) {
        avatar.eat(food[i]);
      }
      food[i].display();
    }
  ///////////////////////////
  avatar.display();
}
