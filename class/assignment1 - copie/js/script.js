let mySquare;
let myCircle;
let myOtherCircle;

function setup() {
  createCanvas(windowWidth,windowHeight);
  mySquare = new Square(random(0,width),random(0,height),100);
  myCircle = new Circle(random(0,width),random(0,height),200,color(100,100,200));
  myOtherCircle = new Circle(random(0,width),random(0,height),200,color(200,100,200));
}

function draw() {
  background(255);

  mySquare.update();
  myCircle.update();
  myOtherCircle.update();

  mySquare.display();
  myCircle.display();
  myOtherCircle.display();
}
