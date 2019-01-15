class Agent {
  constructor(x,y,size,agentColor) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.agentColor = agentColor;
    this.active = true;
  }

  checkOverlap(firstAgent,secondAgent) {
    if (!firstAgent || !secondAgent) {
      return;
    }
    let d = dist(this.x,this.y,secondAgent.x,secondAgent.y);
    if (d < this.size/2 + secondAgent.size/2) {
      return true;
    }
  }

  display() {
    if (!this.active) {
      return;
    }

    push();
    noStroke();
    // console.log(this.size);
    fill(this.agentColor);
    ellipse(this.x,this.y,this.size);
    pop();
  }
}
