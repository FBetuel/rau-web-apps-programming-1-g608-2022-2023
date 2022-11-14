// modificari
// 1. identificam elementul 
// 2. extragem elementul folosind document API
// 2.1 by id 
const playtimeDisplay = document.getElementById("playtime-display");
console.log(playtimeDisplay);
// 2.2 by name 
const playtimeDisplayName = document.getElementsByName("playtime-display");
console.log(playtimeDisplayName);

// 2.3 by CSS class 
const playtimeDisplayCSS = document.getElementsByClassName("playtime-display");
console.log(playtimeDisplayCSS);

// 2.4 by tag name 
const playtimeDisplayTag = document.getElementsByTagName("span");
console.log(playtimeDisplayTag);

// 3. modificam proprietatile elementului 
let playtimeValue = 0;
const maxValue = 10;
while (playtimeValue < maxValue) {
    playtimeDisplay.innerText = playtimeValue;
    playtimeValue = playtimeValue + 1;
}

// delete v1 
// 1. identific si extrag elementul dorit
// 2. remove()
// playtimeDisplay.remove();

// delete v2
// 1. identific si extrag parintele elementului dorit
// let playtimeDisplayParent = document.getElementsByClassName("playtime");
// playtimeDisplayParent = playtimeDisplayParent[0];

// 2. identific si extrag elementul 

// 3. parinte.removeChild(element)
// playtimeDisplayParent.removeChild(playtimeDisplay);

// example delete element on button click
// function deletePlaytimeDisplay() {
//     const playtimeDisplay = document.getElementById("playtime-display");
//     if (playtimeDisplay) {
//         playtimeDisplay.remove();
//     }
// }

// create 
// 1. creez un element 
// const p = document.createElement("p");

// 2. customizez elementul 
// p.innerText = "Paragraf nou creat cu JavaScript.";
// p.style.fontSize = "50px";

// 3. identific parintele (tag-ul) in care vreau sa adaug elementul 
// // 4. extrag parintele
// let pauseButton = document.getElementsByClassName("pause-button");
// pauseButton = pauseButton[0];

// 5. adaug elementul in lista de copii a parintelui (appendChild(), insertBefore(), etc.)
// pauseButton.appendChild(p);

const PROGRESS = [
    {
        value: 5,
        timestamp: "2022-11-07T17:15"
    },
    {
        value: 10,
        timestamp: "2022-11-07T17:18"
    },
    {
        value: 15,
        timestamp: "2022-11-07T17:26"
    },
    {
        value: 20,
        timestamp: "2022-11-07T17:27"
    },
    {
        value: 50,
        timestamp: "2022-11-07T17:31"
    }
]

const LEADERS = [
    {
        value: 1,
        timestamp: "2022-11-10T02:23"
    }
]

// let progressBarDiv = document.getElementsByClassName("progressbar");
// progressBarDiv = progressBarDiv[0];

function createProgressDiv(element) {
    const progressDiv = document.createElement("div");
    const span = document.createElement("span");

    const currentProgress = element;
    const currentProgressValue = currentProgress.value;
    const currentProgressTimestamp = currentProgress.timestamp; 
    span.innerText = `Time: ${currentProgressTimestamp} | Progress: ${currentProgressValue}%`;
    if (currentProgressValue < 15) {
        progressDiv.className = "progress-start";
    } else if (currentProgressValue >= 15 && currentProgressValue < 20) {
        progressDiv.className = "progress-medium";
    } else {
        progressDiv.className = "progress-end";
    }
    progressDiv.appendChild(span);
    return progressDiv;
}

let progressBarDiv = document.getElementById("progressbar");
if (progressBarDiv) {
    // create one div for each progress value 
    for (const element of PROGRESS) {
        const progressDiv = createProgressDiv(element);
        progressBarDiv.appendChild(progressDiv);
    }
}



