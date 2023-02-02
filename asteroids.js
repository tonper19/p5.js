let ship;

function setup() {
    createCanvas(windowWidth, windowHeight);
    ship = new Ship();
}

function draw() {
    background(0);
    ship.render();
    ship.turn();
    ship.update();
}

function keyReleased() {
    ship.setRotation(0);
    ship.boosting(false);
}


function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        ship.setRotation(0.1);
    } else if (keyCode === LEFT_ARROW) {
        ship.setRotation(-0.1);
    } else if (keyCode === UP_ARROW) {
        ship.boosting(true);
    }
}


class Ship {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.r = 20;
        this.heading = 0;
        this.rotation = 0;
        this.vel = createVector(1, 0);
        this.isBoosting = false;

        this.boosting = function(b){
            this.isBoosting = b;
        }
    }

    update() {
        this.pos.add(this.vel);
        if (this.isBoosting) {
            this.boost();
        }
        if (this.pos.x > width) {
            this.pos.x = 0;
        } else if (this.pos.x < 0) {
            this.pos.x = width;
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
        } else if (this.pos.y < 0) {
            this.pos.y = height;
        }
        this.vel.mult(0);
    }

    boost() {
        let force = p5.Vector.fromAngle(this.heading);
        force.mult(0.1);
        this.vel.add(force);
    }

    render() {
        translate(this.pos.x, this.pos.y);
        rotate(this.heading);
        noFill();
        stroke(255);
        triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    }

    setRotation(a) {
        this.rotation = a;
    }

    turn() {
        this.heading += this.rotation;
    }
}



// function setup() {
//     createCanvas(windowWidth, windowHeight)
// }

// function draw




