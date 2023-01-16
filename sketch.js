// function setup() {
//   createCanvas(600, 600);
// }

// function draw() {
//   background(220,0,200);
//   line(0,0,600,600);
//   rect(30,20, 55,55)
// }




function setup() {
  creatCanvas(400, 300);
}

function draw() {
  background(100);

  //line (0, 50, 400, 300);
  rectMode(CENTER);
  //rect(200, 150, 150, 150);

  fill(0, 255, 0);
  stroke(0, 0, 255);
  strokeWheight(4);
  rect(200, 150, 150, 150);

  fill(255, 0,0, 175);
  noStroke();
  ellipse(150, 250, 100, 75);
}