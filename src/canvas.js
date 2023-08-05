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
let time = 0;

const shipHeight = 10;
const shipWidth = 25;
let shipX = (canvas.width - shipWidth) / 2;
let shipY = (canvas.height - shipHeight) / 2;

let asteroids = [];

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Elapsed Time: ${time}`, 8, 20);
}

// Draws the asteroid
function drawAsteroid(anAsteroid) {
    ctx.beginPath();
    ctx.arc(anAsteroid.x, anAsteroid.y, anAsteroid.radius, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

// Create an asteroid at the top of the canvas
function spawnAsteroid() {
    const x = Math.floor(Math.random() * canvas.width);
    const radius = Math.min(Math.floor(Math.random() * 50), 10);
    const dx = Math.floor(Math.random() * 20) - 10;
    const dy = Math.floor(Math.random() * 10);

    // Save the asteroid so it can be drawn each frame
    const theAsteroid = {
        dx: dx,
        dy: dy,
        radius: radius,
        x: x,
        y: 0,
    };

    drawAsteroid(theAsteroid);
    asteroids.push(theAsteroid);
}

// Moves each asteroid based on its speed
function moveAsteroids() {
    asteroids.forEach((asteroid) => {
        asteroid.x = asteroid.x + asteroid.dx;
        asteroid.y = asteroid.y + asteroid.dy;

        if (asteroid.x < 0
            || asteroid.x > canvas.width
            || asteroid.y < 0
            || asteroid.y > canvas.height) {
            asteroid['offscreen'] = true;
        }
    });

    asteroids = asteroids.filter((asteroid) => !asteroid.offscreen);
}

function drawship() {
    ctx.beginPath();
    ctx.rect(shipX, shipY, shipWidth, shipHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Move the ship based on which buttons are pressed
function moveShip() {
    if (rightPressed) {
        shipX = Math.min(shipX + 7, canvas.width - shipWidth);
    } else if (leftPressed) {
        shipX = Math.max(shipX - 7, 0);
    }
    if (upPressed) {
        shipY = Math.max(shipY - 7, 0);
    } else if (downPressed) {
        shipY = Math.min(shipY + 7, canvas.height - shipHeight);
    }
}

// Check if the ship collided with any of the asteroids
function checkForCollisions() {
    asteroids.forEach((asteroid) => {
        if ((shipX >= asteroid.x - asteroid.radius)
            && (shipX <= asteroid.x + asteroid.radius)
            && (shipY >= asteroid.y - asteroid.radius)
            && (shipY <= asteroid.y + asteroid.radius)) {
            // collision
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
        }
    });
}

// Draw a frame of the game 
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawScore();
    if (time % 1000 === 0) spawnAsteroid();
    drawship();
    moveAsteroids();
    asteroids.forEach((asteroid) => drawAsteroid(asteroid));

    moveShip();
    checkForCollisions();

    time += 10;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    console.debug('keyDownHandler: ', e);

    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    } else if (e.key === "Up" || e.key === "ArrowUp") {
        upPressed = true;
    } else if (e.key === "Down" || e.key === "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    console.debug('keyUpHandler', e);

    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    } else if (e.key === "Up" || e.key === "ArrowUp") {
        upPressed = false;
    } else if (e.key === "Down" || e.key === "ArrowDown") {
        downPressed = false;
    }
}

// Call draw() every 10 milliseconds
const interval = setInterval(draw, 10);
