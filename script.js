/* global keyIsPressed, CENTER, image, fill, rect, ellipse, loadImage, imageMode, keyCode, keyIsDown, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, collideRectCircle, textSize, text, createCanvas, colorMode, HSB, random, width, height, background */

class Car {
  constructor(carX, carY, carWidth, carHeight, hue, carV) {
    this.carX = carX;
    this.carY = carY;
    this.carV = carV;
    this.carWidth = carWidth;
    this.carHeight = carHeight;
    this.hue = hue;
    this.car = loadImage("https://cdn.glitch.com/8c9ca090-47c5-4c31-a5d6-109c2ce00db7%2Fpolice-car-png-top-view-transparent-police-car-top-viewpng-images-top-down-car-png-600_300.png?v=1595014856350")
  }
  
  display() {
    fill(this.hue, 80, 80);
    //rect(this.carX, this.carY, this.carWidth, this.carHeight);
    imageMode(CENTER);
    image(this.car, this.carX, this.carY, this.carWidth, this.carHeight);
  }
  move() {
    if (keyIsDown(UP_ARROW)) {
        this.carX -= this.carV;
      }
      if (keyIsDown(DOWN_ARROW)) {
        this.carX += this.carV;
      }
      if (keyIsDown(LEFT_ARROW)) {
        this.carV += 1;
        if (carV > 10) {
          carV = 10;
        }
      }
      if (keyIsDown(RIGHT_ARROW)) {
        this.carV -= 1;
        if (carV <= 0) {
          carV = 1;
        }
      }

      if (this.carX > width - this.carWidth) {
        this.carX = 0;
      }
      if (this.carX < 0) {
        this.carX = width - this.carWidth;
      }
  }
}

// class Frog{
//   constructor(){
//   }
// }

let backgroundColor,
  frogX, //xpos
  frogY, //ypos
  frogV,
  score, //??? counter
  lives, //how many times b4 game end
  gameIsOver, //if game is over
  carWidth,
  carHeight,
  frogDiameter,
  numCars,
  carX,
  carY,
  carHue,
  carV,
  background,
  alex, skipper, marty, melman, gloria;

let cars = [];
//p5 FUNCTIONS

function setup() {
  // Canvas & color settings
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  background = loadImage("https://cdn.glitch.com/8c9ca090-47c5-4c31-a5d6-109c2ce00db7%2Froad-icon-cartoon-style-vector-15918014.jpg?v=1595015162252")
  
  
  imageMode(CENTER);
  alex = loadImage("https://cdn.glitch.com/8c9ca090-47c5-4c31-a5d6-109c2ce00db7%2Falex_the_lion_4.png?v=1595014044236");
  skipper = loadImage('https://cdn.glitch.com/8c9ca090-47c5-4c31-a5d6-109c2ce00db7%2FSkipper04.png?v=1595015303996');
  marty = loadImage("https://cdn.glitch.com/8c9ca090-47c5-4c31-a5d6-109c2ce00db7%2FMarty_the_Zebra.png?v=1595015373210");
  melman = loadImage("https://cdn.glitch.com/8c9ca090-47c5-4c31-a5d6-109c2ce00db7%2FMelman.png?v=1595015463674");
  gloria = loadImage("https://cdn.glitch.com/8c9ca090-47c5-4c31-a5d6-109c2ce00db7%2FGloria.png?v=1595015543203");
  
  frogX = width / 2;
  frogY = height - 20;
  frogV = 5;

  score = 0;
  lives = 3;
  gameIsOver = false;
  // car1X = 0;
  // car1Y = 100;
  // car1V = 5;

  carWidth = 50;
  carHeight = 30;
  frogDiameter = 20;
  numCars = 4;

  carX = 0;
  carY = 80;
  carHue = 20;
  carV = 1;

  for (let i = 0; i < numCars; i++) {
    cars.push(new Car(carX, carY, carWidth, carHeight, carHue, carV));
    //carV*=-1;
    carX = random(0, width - carWidth);
    carY += 60;
    carHue += 100;
  }
}

function draw() {
  
  if (!gameIsOver) {
    //background(backgroundColor);
    image(background,width,height);

    drawGoalLine();
    //drawFrog();
    frogMove();
    
    if(score<1) {
      image(alex,frogX,frogY,60,60)
    } else if(score <2) {
      image(marty,frogX,frogY,60,60)
    } else if(score <3) {
      image(melman,frogX,frogY,60,60)
    } else if(score <4) {
      image(gloria,frogX,frogY,60,60)
    } else if(score <5) {
      image(skipper,frogX,frogY,40,60)
    }

    for (let i = 0; i < numCars; i++) {
      cars[i].display();
      cars[i].move();
      checkCollisions(cars[i].carX, cars[i].carY);
    }
    checkWin();
    endGame();
    displayScores();
  }
  //camelCase
}

//OUR FUNCTIONS//

function drawGoalLine() {
  fill(90, 80, 80);
  rect(0, 0, width, 50);
}

// function drawFrog() {
//   fill(120, 80, 80);
//   ellipse(frogX, frogY, frogDiameter);
// }

function frogMove() {
  //up
  if (keyIsDown(UP_ARROW)){
      frogY -= frogV;
  }
  //down
  if (keyIsDown(DOWN_ARROW)){
      frogY += frogV;
  }
  //left
  if(keyIsDown(LEFT_ARROW)){
        frogX -= frogV;
  }
  //right
  if(keyIsDown(RIGHT_ARROW)){
          frogX += frogV;
  }
}

function checkCollisions(carX, carY) {
  // If the frog collides with the car, reset the frog and subtract a life.
  let hasCarCollidedWithFrog = collideRectCircle(
    carX,
    carY,
    carWidth,
    carHeight,
    frogX,
    frogY,
    frogDiameter
  );
  if (hasCarCollidedWithFrog) {
    resetFrog();
    lives--;
  }
}

function checkWin() {
  // If the frog makes it into the yellow gold zone, increment the score
  // and move the frog back down to the bottom.
  if (frogY < 50) {
    score++;
    //carV += 5;
    resetFrog();
  }
}

function resetFrog() {
  frogX = width / 2;
  frogY = height - 20;
}

function displayScores() {
  textSize(12);
  fill(0);
  // Display Lives
  text(`Lives: ${lives}`, 10, 20);
  // Display Score
  text(`Score: ${score}`, 10, 40);
}

function endGame() {
  // Display game over message if the game is over
  if (lives === 0) {
    gameIsOver = true;
    text("Game Over!", width / 2 - 40, height / 2);
  }
  if (score === 5) {
    gameIsOver = true;
    frogV = 0;
    text("Game Over!", width / 2 - 40, height / 2);
  }
}

/*
refactoring: take code and make it more readable
not changing functionality of the code tho 

If we were to use a sprite, 
would we still be able to use this collide library? 
Or would a separate collision system need to be created?

Jason, that would very much depend on how you drew and cropped your sprite
If you were using rectangular bounding boxes for your sprites, 
you could use this same method
If you wanted bounding boxes that looked more like the sprites, 
you would probably have to use custom collision detection functions
*/
