class Avatar extends Agent {
  constructor(x,y,size,agentColor,maxSize,lostSize) {
    super(x,y,size,agentColor);
    this.maxSize = maxSize;
    this.lostSize = lostSize;
  }

  update() {
    if(!this.active){
      return;
    }

    this.x = mouseX;
    this.y = mouseY;

    this.size = constrain(this.size - this.lostSize,0,this.maxSize);


    if (this.size === 0) {
      this.active = false;
    }
  }

  eating(food) {
    if(!this.active){
      return;
    }
    this.size = constrain(this.size + food.size,0,this.maxSize);
    food.reset();
  }
}
