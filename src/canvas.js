// Get a reference to the canvas element and its context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Starting position of the ball
let x = canvas.width / 2;
let y = canvas.height - 30;
let radius = 10;

// Change in position of the ball
let dx = 2;
let dy = -2;
let timer = 1;

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

// Draw ball centered at (x, y)
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Move the ball
function moveBall() {
    // Detect collision with left or right side
    if (x < 0 + radius || x > canvas.width - radius) {
        // Reverse direction on the X axis
        dx *= -1;
    }

    // Detect collision with top or bottom side
    if (y < 0 + radius) {
        // Reverse direction on the Y axis
        dy *= -1;
    } else if (y > canvas.height - radius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy *= -1;
        } else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
        }
    }

    // Advance the center of the circle
    x += dx;
    y += dy;

    // Increase speed every 100 frames
    if (timer % 100 === 0) {
        dx *= 1.1;
        dy *= 1.1;
    }
}

// Draw a frame of the game 
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();
    moveBall();

    if (rightPressed) {
        paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
    } else if (leftPressed) {
        paddleX = Math.max(paddleX - 7, 0);
    }

    timer += 1;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

// Call draw() every 10 milliseconds
const interval = setInterval(draw, 10);
