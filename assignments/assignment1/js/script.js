"use strict";

/*****************

Circle Eater
Pippin Barr

modified by Justine Lardeux (40030920)

A simple game in which the player controls a shrinking circle with their mouse and tries
to overlap another circle (food) in order to grow bigger.

******************/

// Constants defining key quantities
const AVATAR_SIZE_GAIN = 50;
const AVATAR_SIZE_LOSS = 1;

// Avatar is an object defined by its properties
let avatar = {
  x: 0,
  y: 0,
  maxSize: 64,
  size: 64,
  active: true,
  color: '#cccc55'
}

// Food is an object defined by its properties
let food = {
  x: 0,
  y: 0,
  ///////// NEW /////////
  vx: 5,
  vy: 5,
  maxSpeed: 10,
  ///////////////////////
  size: 64,
  color: '#55cccc'
}

// preload()
//
// Not needed

function preload() {

}


// setup()
//
// Create the canvas, position the food, remove the cursor

function setup() {
  createCanvas(windowWidth,windowHeight);
  positionFood();
  noCursor();
}


// draw()
//
// Move the avatar, check for collisions, display avatar and food

function draw() {
  // Make sure the avatar is still alive - if not, we don't run
  // the rest of the draw loop
  if (!avatar.active) {
    // By using "return" the draw() function exits immediately
    return;
  }

  // Otherwise we handle the game
  background(0);
  updateAvatar();
  updateFood();
  checkCollision();
  displayAvatar();
  displayFood();
}

// updateAvatar()
//
// Set the position to the mouse location
// Shrink the avatar
// Set it to inactive if it reaches a size of zero
function updateAvatar() {
  avatar.x = mouseX;
  avatar.y = mouseY;
  // Shrink the avatar and use constrain() to keep it to reasonable bounds
  avatar.size = constrain(avatar.size - AVATAR_SIZE_LOSS,0,avatar.maxSize);
  if (avatar.size === 0) {
    avatar.active = false;
  }
}

///////// NEW /////////
// updateFood
//
// Set the position of the food based on its velocity, constrained to the canvas and randomly changes
// the food's velocity to a random velocity based on its maximum speed and the frameCount.
function updateFood() {
  // Apply velocity on x and y position of the food
  food.x += food.vx;
  food.y += food.vy;
  // if the food is at the end of the canvas, inverse the x or y velocity to make the food bounce back
  if (food.x - food.size/2 <=0 || food.x + food.size/2 >= width) {
    food.vx = -food.vx;
  }
  if (food.y - food.size/2 <=0 || food.y + food.size/2 >= height) {
    food.vy = -food.vy;
  }
  // Every 50 frames, change the x and y velocity randomly according to the maxSpeed
  if(frameCount % 50 === 0) {
    food.vx = random(-food.maxSpeed,food.maxSpeed);
    food.vy = random(-food.maxSpeed,food.maxSpeed);
  }
}
///////////////////////

// checkCollision()
//
// Calculate distance of avatar to food
// Check if the distance is small enough to be an overlap of the two circles
// If so, grow the avatar and reposition the food
function checkCollision() {
  let d = dist(avatar.x,avatar.y,food.x,food.y);
  if (d < avatar.size/2 + food.size/2) {
    avatar.size = constrain(avatar.size + AVATAR_SIZE_GAIN,0,avatar.maxSize);
    positionFood();
  }
}

// displayAvatar()
//
// Draw the avatar in its current position, using its size and color
// Use push() and pop() around it all to avoid affecting the rest of the program
// with drawing commands
function displayAvatar() {
  push();
  noStroke();
  fill(avatar.color);
  ellipse(avatar.x,avatar.y,avatar.size);
  pop();
}

// displayFood()
//
// Draw the food in its current position, using its size and color
// Use push() and pop() around it all to avoid affecting the rest of the program
// with drawing commands
function displayFood() {
  push();
  noStroke();
  fill(food.color);
  ellipse(food.x,food.y,food.size);
  pop();
}

// positionFood()
//
// Set the food's position properties to random numbers within the canvas dimensions
function positionFood() {
  food.x = random(0,width);
  food.y = random(0,height);
}
