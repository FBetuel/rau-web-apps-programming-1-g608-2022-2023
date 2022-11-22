const canvas = document.getElementById("viewport");

const context = canvas.getContext('2d');

const player = new Image();
class Position {
    constructor(x, y){
        this.x = x;
        this.y= y;
    }
}
// TODO: Don't allow direct use
let playerPos = new Position(0,0)


const enemyWeak = new Image();
const enemyPowerful = new Image();

initializeCanvas();

function initializeCanvas() {
    player.src = 'assets/game/player.png';
    player.onload = drawImage;
}


function drawImage() {
    context.drawImage(player, 0, 470);
    playerPos = new Position(0, 470); 
}

function onKeyPress(e) {
    const canvas = document.getElementById("viewport");

    console.log(e.keyCode)

    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    console.log(e.keyCode)
    // Check Input
    switch (e.keyCode) {
        // move right
        case 100: // D
        case 39: // Right Arrow
            movePlayerTo(playerPos.x+=100,playerPos.y)
        break
        // move left
        case 97: // A
        case 37: // Left arrow
            movePlayerTo(playerPos.x-=100,playerPos.y)
    }

    // Redraw frame
    drawPlayer();
    //Tdrawenemies...
    //Tbackgrounds
}
function movePlayerTo(x, y) {
    if (x > 740) {
        playerPos.x = 740;
    } else if (x < 0) {
        playerPos.x = 0;
    } else {
        playerPos.x = x;
    }
}

function drawPlayer() {
    context.drawImage(player, playerPos.x, playerPos.y);
}

function arrowKeysSnowflakes(e) {
    if (e.keyCode == '38') {// up arrow
    }
    else if (e.keyCode == '40') { // down arrow
    }
    else if (e.keyCode == '37') { // left arrow
        onKeyPress(e);
    }
    else if (e.keyCode == '39') { // right arrow
        onKeyPress(e);
    }
}

window.addEventListener("keypress", onKeyPress);
window.addEventListener("keydown", arrowKeysSnowflakes);