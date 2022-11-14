const canvas = document.getElementById("viewport");

const context = canvas.getContext('2d');

const player = new Image();
const enemyWeak = new Image();
const enemyPowerful = new Image();

initializeCanvas();

function initializeCanvas() {
    player.src = 'assets/game/player.png';
    player.onload = drawImage;
}

function drawImage() {
    context.drawImage(player, 285, 470);
}

function onKeyPress() {
    const canvas = document.getElementById("viewport");
    const context = canvas.getContext('2d');
    // check if I have a player item
    // if yes, update player item position according to the pressed key
}