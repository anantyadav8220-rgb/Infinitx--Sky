/* =========================================
INFINITIX SKY V3.2
SCRIPT.JS
PART 1
CORE ENGINE
========================================= */

/* =========================
APP INFO
========================= */

const APP = {

name: "INFINITIX SKY",

version: "3.2",

build: "Public"

};

/* =========================
USER DATA
========================= */

let userData = {

username: "Guest",

title: "Beginner",

level: 1,

xp: 0,

coins: 500,

followers: 12,

achievements: []

};

/* =========================
LOCAL STORAGE
========================= */

function saveUserData(){

localStorage.setItem(

"infinitix_userdata",

JSON.stringify(userData)

);

}

function loadUserData(){

const data =

localStorage.getItem(

"infinitix_userdata"

);

if(data){

userData =

JSON.parse(data);

}

}

loadUserData();

/* =========================
PAGE SYSTEM
========================= */

function showPage(pageId){

const pages =

document.querySelectorAll(

".pageSection"

);

pages.forEach(page=>{

page.classList.add(

"hidden"

);

});

const target =

document.getElementById(

pageId

);

if(target){

target.classList.remove(

"hidden"

);

}

window.scrollTo({

top:0,

behavior:"smooth"

});

}

/* =========================
LOADING SCREEN
========================= */

window.addEventListener(

"load",

()=>{

const loader =

document.getElementById(

"loadingScreen"

);

if(!loader) return;

setTimeout(()=>{

loader.style.opacity = "0";

setTimeout(()=>{

loader.remove();

},400);

},500);

}

);

/* =========================
NOTIFICATION SYSTEM
========================= */

function notify(message){

let container =

document.getElementById(

"notificationContainer"

);

if(!container) return;

const note =

document.createElement(

"div"

);

note.className =

"notification";

note.textContent =

message;

container.appendChild(

note

);

setTimeout(()=>{

note.remove();

},3000);

}

/* =========================
POPUP SYSTEM
========================= */

function showPopup(

title,

message

){

const popup =

document.createElement(

"div"

);

popup.id =

"popup";

popup.innerHTML =

`

<div class="popupBox">

<h2>${title}</h2>

<p>${message}</p>

<br>

<button onclick="closePopup()">

Close

</button>

</div>

`;

document.body.appendChild(

popup

);

}

function closePopup(){

const popup =

document.getElementById(

"popup"

);

if(popup){

popup.remove();

}

}

/* =========================
PROFILE UPDATE
========================= */

function updateProfile(){

const titleEl =

document.getElementById(

"profileTitle"

);

const levelEl =

document.getElementById(

"profileLevel"

);

const xpEl =

document.getElementById(

"profileXP"

);

const coinEl =

document.getElementById(

"profileCoins"

);

const followerEl =

document.getElementById(

"profileFollowers"

);

if(titleEl)

titleEl.textContent =

userData.title;

if(levelEl)

levelEl.textContent =

userData.level;

if(xpEl)

xpEl.textContent =

userData.xp;

if(coinEl)

coinEl.textContent =

userData.coins;

if(followerEl)

followerEl.textContent =

userData.followers;

}

/* =========================
UTILITIES
========================= */

function randomID(){

return Math.floor(

100000 +

Math.random()*900000

);

}

function formatNumber(num){

return num.toLocaleString();

}

/* =========================
STARTUP
========================= */

window.addEventListener(

"load",

()=>{

showPage(

"homePage"

);

updateProfile();

notify(

"Welcome to INFINITIX SKY"

);

console.log(

APP.name +

" " +

APP.version +

" Loaded"

);

}

);
/* =========================================
SCRIPT.JS
PART 2
PROFILE & PROGRESSION
========================================= */

/* =========================
ATS
ACHIEVEMENT TITLE SYSTEM
========================= */

const ATS_TITLES = [

{
title:"Beginner",
level:1
},

{
title:"Explorer",
level:5
},

{
title:"Survivor",
level:10
},

{
title:"Champion",
level:20
},

{
title:"Legend",
level:50
}

];

/* =========================
UPDATE TITLE
========================= */

function updateTitle(){

let currentTitle = "Beginner";

ATS_TITLES.forEach(data=>{

if(userData.level >= data.level){

currentTitle = data.title;

}

});

userData.title = currentTitle;

saveUserData();

}

/* =========================
ACHIEVEMENTS
========================= */

function unlockAchievement(name){

if(

userData.achievements.includes(name)

){

return;

}

userData.achievements.push(name);

saveUserData();

renderAchievements();

notify(

"🏆 Achievement Unlocked"

);

}

/* =========================
RENDER ACHIEVEMENTS
========================= */

function renderAchievements(){

const container =

document.getElementById(

"achievementList"

);

if(!container) return;

if(

userData.achievements.length === 0

){

container.innerHTML =

"No achievements yet.";

return;

}

container.innerHTML =

userData.achievements

.map(a=>`<p>🏆 ${a}</p>`)

.join("");

}

/* =========================
XP SYSTEM
========================= */

function addXP(amount){

userData.xp += amount;

while(userData.xp >= 100){

userData.xp -= 100;

userData.level++;

notify(

"⭐ Level Up!"

);

}

updateTitle();

saveUserData();

updateProfile();

}

/* =========================
COIN SYSTEM
========================= */

function addCoins(amount){

userData.coins += amount;

saveUserData();

updateProfile();

}

function removeCoins(amount){

if(

userData.coins < amount

){

notify(

"Not enough coins"

);

return false;

}

userData.coins -= amount;

saveUserData();

updateProfile();

return true;

}

/* =========================
FOLLOWERS
========================= */

function addFollower(){

userData.followers++;

saveUserData();

updateProfile();

}

/* =========================
FRIENDS
========================= */

if(!userData.friends){

userData.friends = [];

}

function addFriend(name){

if(

userData.friends.includes(name)

){

return;

}

userData.friends.push(name);

saveUserData();

notify(

name + " added"

);

}

/* =========================
PROGRESS CHECK
========================= */

function checkProgress(){

if(userData.level >= 5){

unlockAchievement(

"Reach Level 5"

);

}

if(userData.level >= 10){

unlockAchievement(

"Reach Level 10"

);

}

if(userData.coins >= 1000){

unlockAchievement(

"Earn 1000 Coins"

);

}

}

/* =========================
FIRST LOGIN
========================= */

window.addEventListener(

"load",

()=>{

unlockAchievement(

"First Login"

);

renderAchievements();

checkProgress();

}

);

/* =========================
AUTO CHECK
========================= */

setInterval(

checkProgress,

5000

);
/* =========================================
SCRIPT.JS
PART 3
GAMES + SETTINGS
========================================= */

/* =========================
GAME LAUNCHER
========================= */

function launchGame(game){

if(game === "tictactoe"){

showPopup(
"Tic Tac Toe",
"Coming Soon"
);

return;

}

if(game === "haunted"){

showPopup(
"Haunted Survival",
"Coming Soon"
);

return;

}

}

/* =========================
EMBEDDED GAME VIEWER
========================= */

function openEmbedGame(url){

const frame =

document.getElementById(
"gameFrame"
);

if(!frame) return;

frame.src = url;

showPage(
"gameViewerPage"
);

notify(
"Game Loaded"
);

}

/* =========================
THEME SYSTEM
========================= */

let darkMode = true;

function toggleTheme(){

if(darkMode){

document.body.style.background =
"#f1f5f9";

document.body.style.color =
"#111827";

notify(
"Light Mode Enabled"
);

}
else{

document.body.style.background =
"#0f172a";

document.body.style.color =
"#ffffff";

notify(
"Dark Mode Enabled"
);

}

darkMode = !darkMode;

}

/* =========================
SOUND SYSTEM
========================= */

let soundEnabled = true;

function toggleSound(){

soundEnabled =
!soundEnabled;

notify(

soundEnabled
?

"Sound Enabled"
:

"Sound Disabled"

);

}

/* =========================
RESET USER DATA
========================= */

function resetData(){

const confirmReset =

confirm(
"Delete all saved data?"
);

if(!confirmReset) return;

localStorage.removeItem(
"infinitix_userdata"
);

location.reload();

}

/* =========================
GAME STATS
========================= */

if(!userData.gamesPlayed){

userData.gamesPlayed = 0;

}

function addGamePlayed(){

userData.gamesPlayed++;

saveUserData();

}

/* =========================
COIN REWARD
========================= */

function rewardPlayer(){

addCoins(50);

addXP(10);

notify(
"+50 Coins"
);

}

/* =========================
UTILITY FUNCTIONS
========================= */

function openHome(){

showPage(
"homePage"
);

}

function openGames(){

showPage(
"gamesPage"
);

}

function openProfile(){

showPage(
"profilePage"
);

}

function openSettings(){

showPage(
"settingsPage"
);

}

function openAbout(){

showPage(
"aboutPage"
);

}

/* =========================
STARTUP CHECK
========================= */

window.addEventListener(

"load",

()=>{

updateProfile();

renderAchievements();

console.log(
"INFINITIX SKY Ready"
);

}

);