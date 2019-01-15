class Food extends Agent {
  constructor(x,y,minSize,maxSize) {
    super(x,y,random(minSize,maxSize),color(200,0,0))
    this.minSize = minSize;
    this.maxSize = maxSize;
  }

  reset(){
    this.x = random(0,width);
    this.y = random(0,height);
    this.size = random(minSize,maxSize);
  }
}
