class Powerup {
    icon;
    name;
    description;
    number;

    constructor(name) {
        this.name = name;
    }

}
const POWERUPS = [
    new Powerup("Rocket"),
    new Powerup("Shield"),
    new Powerup("Speed"), 

    ]

function randomPowerupNumber(powerups) {
    for (const powerup of powerups) {
            powerup.number = parseInt(Math.random() * 10);
    }
    return powerups;
}

randomPowerupNumber(POWERUPS);
sessionStorage.setItem("powerups", JSON.stringify(POWERUPS));


function createPowerups(powerups) { 
    powerups = randomPowerupNumber(powerups);
   

    const inventory = document.getElementById("inventory");
    for (const powerup of powerups) {
        const line = document.createElement("p");
        line.innerText = `${powerup.name} --- ${powerup.number}`;
        inventory.appendChild(line);
    }
}

createPowerups(POWERUPS);