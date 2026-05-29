/* =========================================
INFINITIX SKY V3.2
haunted-survival.js
REAL PLATFORM VERSION
========================================= */


/* =========================================
SECTION 1
GAME CORE ENGINE
========================================= */

const HS = {

    initialized: false,

    running: false,

    paused: false,

    worldLoaded: false,

    multiplayer: false,

    currentWave: 1,

    zombiesKilled: 0,

    fps: 60

};

console.log("🧟 Haunted Survival Loaded");


/* =========================================
SECTION 2
PLAYER SYSTEM
========================================= */

const PLAYER = {

    health: 100,

    armor: 0,

    stamina: 100,

    hunger: 0,

    level: 1,

    xp: 0,

    coins: 0,

    position: {

        x: 0,

        y: 0,

        z: 0

    },

    inventory: [],

    weapon: "Pistol",

    ammo: 30,

    maxAmmo: 30,

    reloading: false

};


/* =========================================
SECTION 3
WEAPON SYSTEM
========================================= */

const WEAPONS = [

    {

        name: "Pistol",

        damage: 10,

        ammo: 30

    },

    {

        name: "Shotgun",

        damage: 35,

        ammo: 8

    },

    {

        name: "Rifle",

        damage: 20,

        ammo: 40

    }

];


/* =========================================
SECTION 4
WORLD SYSTEM
========================================= */

const WORLD = {

    time: "Night",

    weather: "Foggy",

    fogDensity: 0.8,

    moonLight: true,

    mapSize: 5000,

    buildings: [],

    trees: []

};


/* =========================================
SECTION 5
ZOMBIE DATABASE
========================================= */

const ZOMBIES = [];

function spawnZombie(type="Walker") {

    const zombie = {

        id: "ZOMBIE_" + Date.now(),

        type,

        health: 100,

        damage: 10,

        speed: 1,

        x: Math.random() * 100,

        z: Math.random() * 100,

        alive: true

    };

    ZOMBIES.push(zombie);

}


/* =========================================
SECTION 6
SPAWN STARTER ZOMBIES
========================================= */

for(let i = 0; i < 10; i++) {

    spawnZombie();

}


/* =========================================
SECTION 7
START GAME
========================================= */

function startHauntedSurvival() {

    HS.running = true;

    HS.initialized = true;

    HS.worldLoaded = true;

    console.log("🎮 Haunted Survival Started");

}


/* =========================================
SECTION 8
PAUSE SYSTEM
========================================= */

function pauseGame() {

    HS.paused = true;

}

function resumeGame() {

    HS.paused = false;

}


/* =========================================
SECTION 9
PLAYER MOVEMENT
========================================= */

function movePlayer(x,z) {

    PLAYER.position.x += x;

    PLAYER.position.z += z;

}


/* =========================================
SECTION 10
SHOOT SYSTEM
========================================= */

function shootWeapon() {

    if(PLAYER.reloading) return;

    if(PLAYER.ammo <= 0) {

        reloadWeapon();

        return;

    }

    PLAYER.ammo--;

    playGunSound();

    console.log("🔫 Bang");

}


/* =========================================
SECTION 11
RELOAD SYSTEM
========================================= */

function reloadWeapon() {

    if(PLAYER.reloading) return;

    PLAYER.reloading = true;

    console.log("🔄 Reloading");

    setTimeout(() => {

        PLAYER.ammo = PLAYER.maxAmmo;

        PLAYER.reloading = false;

    },2000);

}


/* =========================================
SECTION 12
DAMAGE SYSTEM
========================================= */

function damagePlayer(amount) {

    PLAYER.health -= amount;

    if(PLAYER.health <= 0) {

        gameOver();

    }

}


/* =========================================
SECTION 13
HEAL SYSTEM
========================================= */

function healPlayer(amount) {

    PLAYER.health += amount;

    if(PLAYER.health > 100) {

        PLAYER.health = 100;

    }

}


/* =========================================
SECTION 14
GAME OVER SYSTEM
========================================= */

function gameOver() {

    HS.running = false;

    alert("💀 Game Over");

}


/* =========================================
SECTION 15
WAVE SYSTEM
========================================= */

function nextWave() {

    HS.currentWave++;

    for(let i = 0; i < HS.currentWave * 3; i++) {

        spawnZombie();

    }

}


/* =========================================
SECTION 16
ZOMBIE AI SYSTEM
========================================= */

function updateZombies() {

    ZOMBIES.forEach(zombie => {

        if(!zombie.alive) return;

        zombie.x += 0.1;

    });

}


/* =========================================
SECTION 17
KILL ZOMBIE SYSTEM
========================================= */

function killZombie(id) {

    const zombie =

    ZOMBIES.find(

        z => z.id === id

    );

    if(!zombie) return;

    zombie.alive = false;

    HS.zombiesKilled++;

    addXP(10);

    addCoins(5);

}


/* =========================================
SECTION 18
INVENTORY SYSTEM
========================================= */

function addInventoryItem(item) {

    PLAYER.inventory.push(item);

}

function removeInventoryItem(item) {

    PLAYER.inventory =

    PLAYER.inventory.filter(

        i => i !== item

    );

}


/* =========================================
SECTION 19
MEDKIT SYSTEM
========================================= */

function useMedkit() {

    healPlayer(30);

}


/* =========================================
SECTION 20
SPRINT SYSTEM
========================================= */

function sprintPlayer() {

    if(PLAYER.stamina <= 0) return;

    PLAYER.stamina -= 1;

}


/* =========================================
SECTION 21
STAMINA REGEN
========================================= */

setInterval(() => {

    if(PLAYER.stamina < 100) {

        PLAYER.stamina += 1;

    }

},1000);


/* =========================================
SECTION 22
MULTIPLAYER SYSTEM
========================================= */

function enableMultiplayer() {

    HS.multiplayer = true;

}


/* =========================================
SECTION 23
WORLD FPS UNIT SYSTEM
========================================= */

function updateWorldFPS() {

    HS.fps = 60;

}


/* =========================================
SECTION 24
LCS BLOCK SYSTEM
========================================= */

function updateLCSBlocks() {

    console.log("🧠 Updating Smart Blocks");

}


/* =========================================
SECTION 25
AMBIENT SOUND SYSTEM
========================================= */

function playAmbientSound() {

    console.log("🌬️ Wind Sound");

}


/* =========================================
SECTION 26
GUN SOUND SYSTEM
========================================= */

function playGunSound() {

    console.log("🔊 Gunshot");

}


/* =========================================
SECTION 27
FOOTSTEP SOUND SYSTEM
========================================= */

function playFootsteps() {

    console.log("👣 Footsteps");

}


/* =========================================
SECTION 28
SAVE GAME SYSTEM
========================================= */

function saveHSProgress() {

    localStorage.setItem(

        "hs_progress",

        JSON.stringify({

            player: PLAYER,

            wave: HS.currentWave

        })

    );

}


/* =========================================
SECTION 29
LOAD GAME SAVE
========================================= */

function loadHSProgress() {

    const save = JSON.parse(

        localStorage.getItem(
            "hs_progress"
        )

    );

    if(!save) return;

    Object.assign(PLAYER,save.player);

    HS.currentWave = save.wave;

}

loadHSProgress();


/* =========================================
SECTION 30
AUTO SAVE SYSTEM
========================================= */

setInterval(() => {

    saveHSProgress();

},30000);


/* =========================================
SECTION 31
DAY NIGHT SYSTEM
========================================= */

function toggleDayNight() {

    WORLD.time =

    WORLD.time === "Night"

    ? "Day"

    : "Night";

}


/* =========================================
SECTION 32
WEATHER SYSTEM
========================================= */

function changeWeather(weather) {

    WORLD.weather = weather;

}


/* =========================================
SECTION 33
BOSS ZOMBIE SYSTEM
========================================= */

function spawnBossZombie() {

    spawnZombie("Boss");

}


/* =========================================
SECTION 34
HUD UPDATE SYSTEM
========================================= */

function updateHUD() {

    const hp =

    document.getElementById("playerHealth");

    if(hp) {

        hp.innerText = PLAYER.health;

    }

}


/* =========================================
SECTION 35
MATCH REWARD SYSTEM
========================================= */

function giveMatchRewards() {

    addCoins(100);

    addXP(50);

}


/* =========================================
SECTION 36
DEBUG SYSTEM
========================================= */

function debugHS() {

    console.log({

        HS,

        PLAYER,

        WORLD,

        ZOMBIES

    });

}


/* =========================================
SECTION 37
MAIN GAME LOOP
========================================= */

function gameLoop() {

    if(!HS.running) return;

    if(HS.paused) return;

    updateZombies();

    updateHUD();

    updateWorldFPS();

    updateLCSBlocks();

    requestAnimationFrame(gameLoop);

}


/* =========================================
SECTION 38
FINAL ENGINE START
========================================= */

startHauntedSurvival();

gameLoop();

console.log("✅ haunted-survival.js loaded successfully");
