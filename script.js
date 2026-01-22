// *** Global Variables ***
const gameBoxNode = document.querySelector("#game-box");

const ballNode = document.createElement("div"); // the ball node is created
ballNode.id = "ball"; // we assign an id to the node, just for styles
gameBoxNode.append(ballNode); // we add the node to the game box

const paddleNode = document.createElement("div"); // the paddle node is created
paddleNode.id = "paddle"; // we assign an id to the node, just for styles
gameBoxNode.append(paddleNode); // we add the node to the game box

const ball = {
  x: 50, // position in the X axis (horizontal)
  y: 20, // position in the Y axis (vertical)
  w: 20, // width
  h: 20, // height
  isMovingRight: true,
  isMovingDown: true
};

// assign initial styles (position and dimensions)
ballNode.style.left = `${ball.x}px`;
ballNode.style.top = `${ball.y}px`;
ballNode.style.width = `${ball.w}px`;
ballNode.style.height = `${ball.h}px`;

const paddle = {
  x: 100, // position in the X axis (horizontal)
  y: 530, // position in the Y axis (vertical)
  w: 100, // width
  h: 20, // height
}

paddleNode.style.left = `${paddle.x}px`;
paddleNode.style.top = `${paddle.y}px`;
paddleNode.style.width = `${paddle.w}px`;
paddleNode.style.height = `${paddle.h}px`;

// *** Game Functions ***
function gameLoop() {
  // console.log("game running")

  ballMovement();
  ballWallCollision();
  ballPaddleCollision()
}

function ballMovement() {
  if (ball.isMovingRight) {
    ball.x += 1; // updating the ball in JS environment
    ballNode.style.left = `${ball.x}px`; // updating the ball in DOM environment
    // console.log(ball.x)
  } else {
    ball.x -= 1;
    ballNode.style.left = `${ball.x}px`;
  }

  if (ball.isMovingDown) {
    ball.y += 1;
    ballNode.style.top = `${ball.y}px`;
  } else {
    ball.y -= 1;
    ballNode.style.top = `${ball.y}px`;
  }

}

function ballWallCollision() {
  // checks have to happen 60 times per second
  if ((ball.x + ball.w) >= 400) {
    console.log("ball has collided with right wall");
    ball.isMovingRight = false;
  }

  if ((ball.y + ball.h) >= 600) {
    // ball.isMovingDown = false;
    gameOver()
  }

  if (ball.x <= 0) {
    ball.isMovingRight = true
  }

  if (ball.y <= 0) {
    ball.isMovingDown = true
  }

}

function gameOver() {
  alert("Game Over! you Lose!")
  clearInterval(gameInvervalId)
}

function ballPaddleCollision() {

  if ((ball.y + ball.h) > paddle.y && ball.x > paddle.x && (ball.x + ball.w) < (paddle.x + paddle.w) ) {
    console.log("ball colliding with paddle")
    ball.isMovingDown = false
  }

}

// *** Game Loop Interval ***
let gameInvervalId = setInterval(gameLoop, 1000 / 60); // 60fps

// *** Event Listeners ***
document.addEventListener("keydown", (event) => {
  // onsole.log("clicking something", event.key)
  if (event.key === "ArrowLeft") {
    // console.log("trying to move the paddle left")
    paddle.x -= 40
    paddleNode.style.left = `${paddle.x}px`;
  }
  if (event.key === "ArrowRight") {
    // console.log("trying to move the paddle right")
    paddle.x += 40
    paddleNode.style.left = `${paddle.x}px`;
  }
})
