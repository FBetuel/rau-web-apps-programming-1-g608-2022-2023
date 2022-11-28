const canvas = document.getElementById("viewport");

const context = canvas.getContext('2d');

const Lane = {
    LEFT: 1,
    MID: 2,
    RIGHT: 3,
    count: 3,
    laneWidth: canvas.width / 3,
    laneHeigth: canvas.height
};

const player = new Image();
class Position {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.lane = Lane.MID;
    }
}
// TODO: Don't allow direct use
let playerPos = new Position(0,470)


const enemyWeak = new Image();
const enemyPowerful = new Image();

initializeCanvas();

function initializeCanvas() {
    player.src = 'assets/game/player.png';
    movePlayer(Lane.MID);
    drawPlayer();
    // player.onload = drawImage;
    drawLanes();
}


function drawPlayer() {
    context.drawImage(player, playerPos.x, playerPos.y);
}

function drawLanes() {
    for(let i = 1; i<=Lane.count; i++) {
        context.beginPath();
        context.moveTo(Lane.laneWidth * i, 0);
        context.lineTo(Lane.laneWidth * i, Lane.laneHeigth);
        context.stroke(); 
    }
}

function movePlayer(lane) {
    let half = (Lane.laneWidth + player.width) / 2  // TODO: Get fixed sized textures
    switch(lane) {
        case Lane.LEFT:
            playerPos.x = Lane.laneWidth - half;
        break;
        case Lane.MID:
            playerPos.x = Lane.laneWidth * 2 - half
        break;
        case Lane.RIGHT:
            playerPos.x = Lane.laneWidth * 3 - half
        break;
    }
    playerPos.lane = lane
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
        case 68: // D
        case 100: // d
        case 39: // Right Arrow
            let laneToMoveTo = playerPos.lane + 1 > 3 ? 3 : playerPos.lane + 1
            movePlayer(laneToMoveTo)
        break
        // move left
        case 65: // A
        case 97: // a
        case 37: // Left arrow
            let moveTo = playerPos.lane - 1 < 0 ? 0 : playerPos.lane - 1 
            movePlayer(moveTo)
        break
    }

    // Redraw frame
    drawPlayer();
    drawLanes();
    //Tdrawenemies...
    //Tbackgrounds
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