// Get a reference to the canvas element and its context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Starting position of the ball
let x = canvas.width / 2;
let y = canvas.height - 30;
let radius = 10;

let possibleColors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
let ballColor = possibleColors[0];

// Change in position of the ball
let dx = 2;
let dy = -2;

// Draw ball centered at (x, y)
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

// Move the ball
function moveBall() {
    // Detect collision with left or right side
    if (x < 0 + radius || x > canvas.width - radius) {
        // Reverse direction on the X axis
        dx *= -1;

        // Change the ball's color at random from the possible colors
        ballColor = possibleColors[Math.floor(Math.random() * (possibleColors.length - 1))];
    }

    // Detect collision with top or bottom side
    if (y < 0 + radius || y > canvas.height - radius) {
        // Reverse direction on the Y axis
        dy *= -1;

        // Change the ball's color at random from the possible colors
        ballColor = possibleColors[Math.floor(Math.random() * (possibleColors.length - 1))];
    }

    // Advance the center of the circle
    x += dx;
    y += dy;
}

// Draw a frame of the game 
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    moveBall();
}

// Call draw() every 10 milliseconds
setInterval(draw, 10);
