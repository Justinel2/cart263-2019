// Food
//
// A class to represent food, mostly just involves the ability to be
// a random size and to reset

class Food extends Agent {

  // Constructor
  //
  // Pass arguments on to the super() constructor (e.g. for Agent)
  // Also set a minimum and maximum size for this food object which it
  // will vary between when it resets
  //
  /////////// NEW ///////////
  constructor(x,y,minSize,maxSize,maxSpeed) {
    super(x,y,random(minSize,maxSize),'#55cccc');
    this.minSize = minSize;
    this.maxSize = maxSize;
    this.maxSpeed = maxSpeed;
    this.vx = random(-maxSpeed,maxSpeed);
    this.vy = random(-maxSpeed,maxSpeed);
  }

  // update()
  //
  // Updates the position based on its velocity, constrained to the canvas.
  // Randomly changes the velocity every now and then based on frameCount
  // and based on its maximum speed.
  update() {
    // Apply velocity on x and y position of the food
    this.x += vx;
    this.y += vy;
    // Inverse velocity when the food is at the end of the canvas so it stays in
    if (this.x <= 0 || this.x >= width) {
      this.vx = -this.vx
    }
    if (this.y <= 0 || this.y >= height) {
      this.vy = -this.vy
    }
    // Every 50 frames, change the x and y velocity randomly according to the maxSpeed
    if(frameCount % 50 === 0) {
      this.vx = random(-this.maxSpeed,this.maxSpeed);
      this.vy = random(-this.maxSpeed,this.maxSpeed);
    }
  }
  ///////////////////////////
  // reset()
  //
  // Set position to a random location on the canvas
  // Set the size to a random size within the limits
  // Randomly change velocity
  reset() {
    this.x = random(0,width);
    this.y = random(0,height);
    this.size = random(this.minSize,this.maxSize);
    /////////// NEW ///////////
    this.vx = random(-this.maxSpeed,this.maxSpeed);
    this.vy = random(-this.maxSpeed,this.maxSpeed);
    ///////////////////////////
  }
}
