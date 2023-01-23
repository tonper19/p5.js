// function setup() {
//   createCanvas(800, 900);
//   print("hello");
//   background(0);
// }


// function draw() {
//   ellipse(mouseX, mouseY, 23, 24);
// //  background(0);
  
// }  

// function mousePressed() {
//   background(0);
// }





// 23/01/23

// let circleX = 100;

// function setup() {
//   createCanvas(700, 500);
// }

// function mousePressed() {
//   circleX = 0;
// }


// function draw() {
//   background(0);
//   noStroke();
//   fill(255);
//   circle(circleX, 250, 100);
//   circleX += 1;
// }




let squareSize;
let lineWidth;

function setup() {
  createCanvas(500, 400);
  //squareSize = random(50, 100);
  lineWidth = random(4,28);
  background(100);
}

function draw() {
  //background(100);
  squareSize = random(5, 250);

  rectMode(CENTER);
  strokeWeight(lineWidth);
  stroke(0, 0, 255, 10);
  fill(0, 255, 0, 10);
  square(200, 150, squareSize);
}









