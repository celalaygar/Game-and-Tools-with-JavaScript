const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let moveDirection = "";

document.addEventListener("keydown", (e) => {
    if (e.keyCode === 65) {
        moveDirection = "left";
    } else if (e.keyCode === 68) {
        moveDirection = "right";
    }
});
document.addEventListener("keyup", (e) => {
    if (e.keyCode === 65) {
        moveDirection = "";
    } else if (e.keyCode === 68) {
        moveDirection = "";
    }
});

const player = {
    x: 200,
    y: 650,
    w: 135,
    h: 95,
    dx: 7,
    score: 0,
    hp: 3,
    bullets: 5,
}

let playerFrames = [];
playerFrames.length = 7;

for (let i = 1; i < playerFrames.length; i++) {
    playerFrames[i] = new Image();
    playerFrames[i].src = 'image/spaceship(' + i.toString() + ').jpg';
}
let i = 1;
function updateFrames() {
    i++;
    if (i > 7) i = 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(playerFrames[i], player.x, player.y, player.w, player.h);
}

setInterval(updateFrames, 1000 / 30);

// update player information
const scoreValue = document.querySelector(".scoreValue");
const bulletsValue = document.querySelector(".bulletsValue");
const hpValue = document.querySelector(".hpValue");

function updatePlayerInfo() {
    scoreValue.innerText = player.score;
    bulletsValue.innerText = player.bullets;
    hpValue.innerText = player.hp;
}

// Random number

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function game() {
    update();
    render();
    requestAnimationFrame(game);
}
requestAnimationFrame(game);

function playerMove() {
    if (moveDirection === "left") {
        player.x -= player.dx;
    }
    if (moveDirection === "right") {
        player.x += player.dx;
    }
    if (player.x >= canvas.width - player.w) {
        player.x = canvas.width - player.w;
    }
    if (player.x <= 0) {
        player.x += 0;
    }
}
function gameOver() {
    if (player.hp <= 0) {
        location.reload();
    }

}
function update() {
    playerMove();
    updatePlayerInfo();
    deleteAsteroidArr();
    gameOver();
}

// Render

const asteroidImg = new Image();
asteroidImg.src = 'image/asteroidImg.jpg';
let asteroidArr = [];
let timer = 0;

function movement(asteroid) {
    asteroid.rotate += 0.5;
    asteroid.y += asteroid.dy;

}


function renderAsteroidArr() {
    timer++;
    if (timer % 20 === 0) {
        asteroidArr.push({
            x: getRandomInt(50, canvas.width),
            y: -20, w: 50, h: 50,
            dy: getRandomInt(3, 7),
            rotate: 0
        });
    }
    for (let i in asteroidArr) {
        movement(asteroidArr[i]);
        ctx.save();
        ctx.translate(asteroidArr[i].x, asteroidArr[i].y);
        ctx.rotate(asteroidArr[i].rotate);
        ctx.drawImage(asteroidImg, -asteroidArr[i].w / 2, -asteroidArr[i].h / 2, asteroidArr[i].w, asteroidArr[i].h);
        ctx.restore();
    }

}
function deleteAsteroidArr() {

    for (let i in asteroidArr) {
        if (asteroidArr[i].y > 770) {
            asteroidArr.splice(i, 1);
            player.score++;
        }
        if (player.x <= asteroidArr[i].x &&
            player.x + player.w >= asteroidArr[i].x &&
            player.y <= asteroidArr[i].y) {
            player.hp--;
            asteroidArr.splice(i, 1);
        }
    }

}

function render() {

    ctx.beginPath();
    renderAsteroidArr();
    ctx.closePath();
}