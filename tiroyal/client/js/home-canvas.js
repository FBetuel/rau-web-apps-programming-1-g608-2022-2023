const canvas = document.getElementById("viewport");

const context = canvas.getContext('2d');

const player = new Image();

make_base();

function make_base() {
    player.src = 'assets/game/player.png';
    player.onload = drawImage;
}

function drawImage() {
    context.drawImage(player, 50, 50);
}