const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let SPEED = 7;

let tileCount = 24;
let tileSize = canvas.width / tileCount - 1;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let xVelocity = 0;
let yVelocity = 0;

let appleX = 5;
let appleY = 5;

let score = 0;

//GAME LOOP
function drawGame() {
  changeSnakePos();

  let result = isGameOver();
  if (result) {
    return;
  }

  clearScreen();

  checkAppleCollision();
  drawApple();
  drawSnake();

  drawScore();

  if (score >= 3) SPEED = 8;
  if (score >= 20) SPEED = 12;

  setTimeout(drawGame, 1000 / SPEED);
}

function isGameOver() {
  let gameOver = false;

  if (xVelocity === 0 && yVelocity === 0) {
    return false;
  }

  if (headX < 0 || headX === tileCount || headY < 0 || headY === tileCount) {
    gameOver = true;
  }

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    ctx.fillRect = "white";
    ctx.font = "50px Verdana";

    ctx.fillText("Game Over!", canvas.width / 4.4, canvas.height / 2);

    ctx.fillRect = "white";
    ctx.font = "34px Verdana";

    ctx.fillText("Press enter to restart.", canvas.width / 5.8, canvas.height / 1.6);
  }

  return gameOver;
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "14px Verdana";
  ctx.fillText("Score " + score, canvas.width - 70, 20);
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowColor = "orange";
  ctx.shadowBlur = 40;

  ctx.fillStyle = "green";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];

    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowColor = "green";
    ctx.shadowBlur = 40;
  }

  snakeParts.push(new SnakePart(headX, headY));
  while (snakeParts.length > tailLength) {
    snakeParts.shift();
  }
}

function changeSnakePos() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowColor = "red";
  ctx.shadowBlur = 10;
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
  if (appleX === headX && appleY === headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
  }
}

document.body.addEventListener("keydown", keyDown);

function keyDown(e) {
  //up
  if (event.keyCode === 38) {
    if (yVelocity === 1) return;
    yVelocity = -1;
    xVelocity = 0;
  }

  //down
  if (event.keyCode === 40) {
    if (yVelocity === -1) return;
    yVelocity = 1;
    xVelocity = 0;
  }

  //left
  if (event.keyCode === 37) {
    if (xVelocity === 1) return;
    yVelocity = 0;
    xVelocity = -1;
  }

  if (event.keyCode === 39) {
    if (xVelocity === -1) return;
    yVelocity = 0;
    xVelocity = 1;
  }
}

drawGame();
