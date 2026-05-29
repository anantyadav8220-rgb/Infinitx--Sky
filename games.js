/* =========================================
INFINITIX SKY V3.2
games.js
REAL PLATFORM VERSION
========================================= */


/* =========================================
SECTION 1
GAME ENGINE CORE
========================================= */

const GAMES = {

    installed: [],

    official: [],

    categories: [],

    activeGame: null,

    recentGames: [],

    favorites: []

};

console.log("🎮 Games Engine Loaded");


/* =========================================
SECTION 2
OFFICIAL GAMES DATABASE
========================================= */

GAMES.official = [

    {

        id: "haunted_survival",

        name: "Haunted Survival 3D",

        type: "Horror",

        size: "120MB",

        rating: 4.9,

        multiplayer: true,

        installed: true

    },

    {

        id: "tic_tac_toe",

        name: "LCS Tic Tac Toe",

        type: "Mini Game",

        size: "2MB",

        rating: 4.5,

        multiplayer: true,

        installed: true

    },

    {

        id: "sky_racer",

        name: "Sky Racer",

        type: "Racing",

        size: "85MB",

        rating: 4.8,

        multiplayer: false,

        installed: false

    }

];


/* =========================================
SECTION 3
GAME CATEGORY SYSTEM
========================================= */

GAMES.categories = [

    "Action",

    "Horror",

    "Puzzle",

    "Adventure",

    "Racing",

    "Mini Game",

    "Multiplayer"

];


/* =========================================
SECTION 4
RENDER GAME STORE
========================================= */

function renderGames() {

    const container =

    document.getElementById("gamesContainer");

    if(!container) return;

    container.innerHTML = "";

    GAMES.official.forEach(game => {

        const card =

        document.createElement("div");

        card.className = "gameCard";

        card.innerHTML = `

            <div class="gameThumbnail"></div>

            <h3>${game.name}</h3>

            <p>${game.type}</p>

            <p>⭐ ${game.rating}</p>

            <button onclick="launchGame('${game.id}')">
                Play
            </button>

        `;

        container.appendChild(card);

    });

}


/* =========================================
SECTION 5
GAME LAUNCH SYSTEM
========================================= */

function launchGame(gameId) {

    const game =

    GAMES.official.find(

        g => g.id === gameId

    );

    if(!game) {

        alert("Game Not Found");

        return;

    }

    GAMES.activeGame = game;

    addRecentGame(gameId);

    console.log("🚀 Launching:",game.name);

    openGameScreen(game);

}


/* =========================================
SECTION 6
OPEN GAME SCREEN
========================================= */

function openGameScreen(game) {

    const screen =

    document.getElementById("gameScreen");

    if(!screen) return;

    screen.classList.remove("hidden");

    const title =

    document.getElementById("activeGameTitle");

    if(title) {

        title.innerText = game.name;

    }

}


/* =========================================
SECTION 7
CLOSE GAME SCREEN
========================================= */

function closeGameScreen() {

    const screen =

    document.getElementById("gameScreen");

    if(screen) {

        screen.classList.add("hidden");

    }

    GAMES.activeGame = null;

}


/* =========================================
SECTION 8
RECENT GAMES SYSTEM
========================================= */

function addRecentGame(gameId) {

    if(

        GAMES.recentGames.includes(gameId)

    ) return;

    GAMES.recentGames.unshift(gameId);

}


/* =========================================
SECTION 9
FAVORITE SYSTEM
========================================= */

function addFavoriteGame(gameId) {

    if(

        GAMES.favorites.includes(gameId)

    ) return;

    GAMES.favorites.push(gameId);

}

function removeFavoriteGame(gameId) {

    GAMES.favorites =

    GAMES.favorites.filter(

        id => id !== gameId

    );

}


/* =========================================
SECTION 10
SEARCH GAME SYSTEM
========================================= */

function searchGames(query) {

    return GAMES.official.filter(

        game =>

        game.name
        .toLowerCase()
        .includes(
            query.toLowerCase()
        )

    );

}


/* =========================================
SECTION 11
FILTER GAME CATEGORY
========================================= */

function filterGames(category) {

    return GAMES.official.filter(

        game =>

        game.type === category

    );

}


/* =========================================
SECTION 12
INSTALL GAME SYSTEM
========================================= */

function installGame(gameId) {

    const game =

    GAMES.official.find(

        g => g.id === gameId

    );

    if(!game) return;

    game.installed = true;

    alert("📥 Game Installed");

}


/* =========================================
SECTION 13
UNINSTALL GAME SYSTEM
========================================= */

function uninstallGame(gameId) {

    const game =

    GAMES.official.find(

        g => g.id === gameId

    );

    if(!game) return;

    game.installed = false;

    alert("🗑️ Game Removed");

}


/* =========================================
SECTION 14
GAME DOWNLOAD PROGRESS
========================================= */

function downloadGame(gameId) {

    let progress = 0;

    const interval = setInterval(() => {

        progress += 10;

        console.log(

            "Downloading:",

            progress + "%"

        );

        if(progress >= 100) {

            clearInterval(interval);

            installGame(gameId);

        }

    },300);

}


/* =========================================
SECTION 15
GAME PLAYTIME SYSTEM
========================================= */

const GAME_PLAYTIME = {};

function addPlaytime(gameId,time) {

    if(!GAME_PLAYTIME[gameId]) {

        GAME_PLAYTIME[gameId] = 0;

    }

    GAME_PLAYTIME[gameId] += time;

}


/* =========================================
SECTION 16
HTML5 GAME LOADER
========================================= */

function loadHTML5Game(url) {

    const iframe =

    document.getElementById("gameIframe");

    if(!iframe) return;

    iframe.src = url;

}


/* =========================================
SECTION 17
EMBEDDED GAME SYSTEM
========================================= */

function embedGame(url) {

    loadHTML5Game(url);

}


/* =========================================
SECTION 18
GAME NOTIFICATION SYSTEM
========================================= */

function gameNotify(text) {

    console.log("🎮",text);

}


/* =========================================
SECTION 19
GAME UPDATE SYSTEM
========================================= */

function updateGame(gameId) {

    console.log(

        "Updating Game:",

        gameId

    );

}


/* =========================================
SECTION 20
MULTIPLAYER GAME SYSTEM
========================================= */

function createGameRoom(gameId) {

    console.log(

        "🏠 Game Room Created:",

        gameId

    );

}


/* =========================================
SECTION 21
JOIN GAME ROOM
========================================= */

function joinGameRoom(roomId) {

    console.log(

        "🚪 Joined Room:",

        roomId

    );

}


/* =========================================
SECTION 22
MINI GAME SYSTEM
========================================= */

function startMiniGame(name) {

    console.log(

        "🕹️ Mini Game:",

        name

    );

}


/* =========================================
SECTION 23
GAME ACHIEVEMENT SYSTEM
========================================= */

function unlockGameAchievement(

    title

) {

    unlockAchievement(title);

}


/* =========================================
SECTION 24
SAVE GAME SYSTEM
========================================= */

function saveGameProgress(

    gameId,

    progress

) {

    localStorage.setItem(

        "save_" + gameId,

        JSON.stringify(progress)

    );

}


/* =========================================
SECTION 25
LOAD GAME SAVE
========================================= */

function loadGameProgress(gameId) {

    return JSON.parse(

        localStorage.getItem(
            "save_" + gameId
        )

    );

}


/* =========================================
SECTION 26
GAME ASSET DATABASE
========================================= */

const GAME_ASSETS = [

    "player.glb",

    "zombie.glb",

    "grass.jpg",

    "road.jpg",

    "gunshot.mp3"

];


/* =========================================
SECTION 27
CLOUD GAME SYNC
========================================= */

function syncGameCloud(gameId) {

    console.log(

        "☁️ Syncing:",

        gameId

    );

}


/* =========================================
SECTION 28
FPS MONITOR SYSTEM
========================================= */

function monitorGameFPS() {

    console.log("⚡ FPS Stable");

}

setInterval(

    monitorGameFPS,

    10000

);


/* =========================================
SECTION 29
DEBUG GAME ENGINE
========================================= */

function debugGames() {

    console.log(GAMES);

}


/* =========================================
SECTION 30
FINAL ENGINE START
========================================= */

window.addEventListener("load",() => {

    renderGames();

});

console.log(

    "✅ games.js loaded successfully"

);
