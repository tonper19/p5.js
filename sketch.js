// The Coding train 
// https://www.youtube.com/playlist?list=PLRqwX-V7Uu6bI1SlcCRfLH79HZrFAtBvX
//   function setup() {
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





// 23/01/2023 

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



 // This is to create the canvas with the square 

// let squareSize;
// let lineWidth;

// function setup() {
//   createCanvas(500, 400);
//   //squareSize = random(50, 100);
//   lineWidth = random(4,28);
//   background(100);
// }

// function draw() {
//   //background(100);
//   squareSize = random(5, 250);

//   rectMode(CENTER);
//   strokeWeight(lineWidth);
//   stroke(0, 0, 255, 10);
//   fill(0, 255, 0, 10);
//   square(200, 150, squareSize);
// }

// 8.2 Creating HTML elements with Javascript
// function mousePressed() {
//   //createP("My favorite color is red");
//   createElement("p", "My name is Miguel");
// }

// 24/01/2023 8.3 Manipulating the DOM Elements with HTML and position
// let canvas;
// let h1;

// function setup() {

//   canvas = createCanvas(200, 200);
//   canvas.position(400, 500);
//   h1 = createElement("h1", "Waiting");
//   //h1.position(400, 600);
// }

// function mousePressed(){
//   createP("My favorite numbers below" + random(0,10));
// }

// function draw() {
//   clear();
//   background(255);
//   fill(255, 0, 0);
//   rect(100, 100, 50, 50);
// }


// 8.4 Handling DOM events with Callbacks
// 8.5 Interacting with the DOM using sliders, buttons 
// let bgcolor;
// let button1;
// let button2;
// let slider;
// let nameInput;
// let nameP;

// function setup() {
//   canvas = createCanvas(200, 200);
//   bgcolor = color(200);
//   nameP = createP("Your name!");
//   button1 = createButton("go go go go");
//   button1.mousePressed(changeColor);
//   button2 = createButton("Empty field");
//   slider = createSlider(10, 100, 47);
//   nameInput = createInput("type your name");
//   nameP.mouseOver(overpara);
//   nameP.mouseOut(outpara);

//   nameInput.changed(updateText);
//   nameInput.input(updateText);
  
// }

// function updateText() {
//   nameP.html(nameInput.value());
// }

// function overpara() {
//   nameP.html("Your mouse is over me!");
// }

// function outpara() {
//   nameP.html("Your mouse is out!");
// }

// function changeColor() {
//   bgcolor = color(random(255));
// }

// function mousePressed(){
//   //bgcolor = color(random(255));
//   changeColor();
// }

// function draw() {
//   background(bgcolor);
//   fill(255, 0, 175);
//   ellipse(100, 100, slider.value(), slider.value());
//   //nameP.html(input.value());
//   //text(nameInput.value(), 10, 20);
// }




// 8.7
// let bgcolor;
// let button;
// let txt;

// function setup() {
//   createCanvas(200, 200);
//   bgcolor = color(51);
//   txt = createP("some text");
//   txt.mouseOver(changeStyle)
//   txt.mouseOut(revertStyle)
//   button = createButton("Go");
// }

// // function draw() {
// //   background(bgcolor);
// //   fill(255, 0, 175);
// //   ellipse(100, 100, 50, 50);
// // }

// function changeStyle() { // BUT HOW DOES IT KNOW WICH TXT TO EDIT?? // 8.7 14:00
//   txt.style("background-color", "pink")
//   txt.style("padding", "24px")
// }

// function revertStyle() {
//   txt.style("background-color", "purple");
//   txt.style("padding", "8px");

// }
 
// 8.8

let textbox;
let slider;
let paragraph;

function setup() {
  noCanvas();
  paragraph = createP("starting text");
  textbox = createInput("enter text");
  slider = createSlider(10, 64, 16);

  textbox.changed(updateText);
  slider.input(updateSize);
}

function updateSize() {
  paragraph.style("font-size", slider.value() + "pt");  
}

function updateText() {
  paragraph.html(textbox.value());
}


