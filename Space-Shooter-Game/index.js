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

const scoreValue = document.querySelector(".scoreValue");
const bulletsValue = document.querySelector(".bulletsValue");
const hpValue = document.querySelector(".hpValue");

function updatePlayerInfo() {
    scoreValue.innerText = player.score;
    bulletsValue.innerText = player.bullets;
    hpValue.innerText = player.hp;
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

function update() {
    playerMove();
    updatePlayerInfo();
}

function render() {


}