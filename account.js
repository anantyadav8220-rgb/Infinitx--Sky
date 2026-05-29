/* =========================================
INFINITIX SKY V3.2
account.js
REAL PLATFORM VERSION
========================================= */


/* =========================================
SECTION 1
ACCOUNT ENGINE CORE
========================================= */

const ACCOUNT = {

    currentUser: null,

    loggedIn: false,

    guest: false,

    users: JSON.parse(
        localStorage.getItem("infinitix_users")
    ) || []

};


/* =========================================
SECTION 2
DEFAULT PROFILE DATA
========================================= */

function createDefaultProfile(username) {

    return {

        id: "USER_" + Date.now(),

        username: username,

        bio: "New INFINITIX SKY Player",

        level: 1,

        xp: 0,

        coins: 0,

        gems: 0,

        friends: [],

        followers: 0,

        following: 0,

        inventory: [],

        achievements: [],

        joined: new Date().toISOString(),

        avatar: "👤",

        online: true

    };

}


/* =========================================
SECTION 3
SAVE USER DATABASE
========================================= */

function saveUsersDatabase() {

    localStorage.setItem(
        "infinitix_users",
        JSON.stringify(ACCOUNT.users)
    );

}


/* =========================================
SECTION 4
REGISTER SYSTEM
========================================= */

function registerAccount() {

    const username =
    document.getElementById("registerUsername")?.value?.trim();

    const password =
    document.getElementById("registerPassword")?.value?.trim();

    if(!username || !password) {

        alert("Enter username and password");

        return;

    }

    const exists =
    ACCOUNT.users.find(
        user => user.username === username
    );

    if(exists) {

        alert("Username already exists");

        return;

    }

    const profile =
    createDefaultProfile(username);

    profile.password = password;

    ACCOUNT.users.push(profile);

    saveUsersDatabase();

    alert("Account Created Successfully");

}


/* =========================================
SECTION 5
LOGIN SYSTEM
========================================= */

function loginAccount() {

    const username =
    document.getElementById("loginUsername")?.value?.trim();

    const password =
    document.getElementById("loginPassword")?.value?.trim();

    const user =
    ACCOUNT.users.find(
        u =>
        u.username === username &&
        u.password === password
    );

    if(!user) {

        alert("Invalid Login");

        return;

    }

    ACCOUNT.currentUser = user;

    ACCOUNT.loggedIn = true;

    ACCOUNT.guest = false;

    saveSession();

    loadProfileUI();

    alert("Welcome Back " + user.username);

}


/* =========================================
SECTION 6
GUEST LOGIN SYSTEM
========================================= */

function guestLogin() {

    const guestProfile = {

        id: "GUEST_" + Date.now(),

        username: "Guest Player",

        bio: "Playing as Guest",

        level: 1,

        xp: 0,

        coins: 0,

        gems: 0,

        friends: [],

        inventory: [],

        achievements: [],

        avatar: "👤",

        guest: true

    };

    ACCOUNT.currentUser = guestProfile;

    ACCOUNT.loggedIn = true;

    ACCOUNT.guest = true;

    saveSession();

    loadProfileUI();

    alert("Logged in as Guest");

}


/* =========================================
SECTION 7
SAVE SESSION
========================================= */

function saveSession() {

    localStorage.setItem(
        "infinitix_session",
        JSON.stringify({

            loggedIn: ACCOUNT.loggedIn,

            guest: ACCOUNT.guest,

            currentUser: ACCOUNT.currentUser

        })

    );

}


/* =========================================
SECTION 8
LOAD SESSION
========================================= */

function loadSession() {

    const session =
    JSON.parse(
        localStorage.getItem("infinitix_session")
    );

    if(!session) return;

    ACCOUNT.loggedIn = session.loggedIn;

    ACCOUNT.guest = session.guest;

    ACCOUNT.currentUser = session.currentUser;

}


/* =========================================
SECTION 9
LOGOUT SYSTEM
========================================= */

function logoutAccount() {

    ACCOUNT.loggedIn = false;

    ACCOUNT.currentUser = null;

    ACCOUNT.guest = false;

    localStorage.removeItem(
        "infinitix_session"
    );

    alert("Logged Out");

    location.reload();

}


/* =========================================
SECTION 10
PROFILE UI SYSTEM
========================================= */

function loadProfileUI() {

    if(!ACCOUNT.currentUser) return;

    const usernameEl =
    document.getElementById("profileUsername");

    const levelEl =
    document.getElementById("profileLevel");

    const coinsEl =
    document.getElementById("profileCoins");

    const gemsEl =
    document.getElementById("profileGems");

    if(usernameEl)
    usernameEl.innerText =
    ACCOUNT.currentUser.username;

    if(levelEl)
    levelEl.innerText =
    "Level " + ACCOUNT.currentUser.level;

    if(coinsEl)
    coinsEl.innerText =
    ACCOUNT.currentUser.coins;

    if(gemsEl)
    gemsEl.innerText =
    ACCOUNT.currentUser.gems;

}


/* =========================================
SECTION 11
PROFILE EDIT SYSTEM
========================================= */

function updateProfile() {

    if(!ACCOUNT.currentUser) return;

    const bio =
    document.getElementById("editBio")?.value;

    ACCOUNT.currentUser.bio = bio;

    updateDatabaseUser();

    saveSession();

    alert("Profile Updated");

}


/* =========================================
SECTION 12
DATABASE USER UPDATE
========================================= */

function updateDatabaseUser() {

    if(ACCOUNT.guest) return;

    const index =
    ACCOUNT.users.findIndex(
        user =>
        user.id === ACCOUNT.currentUser.id
    );

    if(index === -1) return;

    ACCOUNT.users[index] =
    ACCOUNT.currentUser;

    saveUsersDatabase();

}


/* =========================================
SECTION 13
XP SYSTEM
========================================= */

function addXP(amount) {

    if(!ACCOUNT.currentUser) return;

    ACCOUNT.currentUser.xp += amount;

    if(ACCOUNT.currentUser.xp >= 100) {

        ACCOUNT.currentUser.level++;

        ACCOUNT.currentUser.xp = 0;

        alert("Level Up!");

    }

    updateDatabaseUser();

    saveSession();

    loadProfileUI();

}


/* =========================================
SECTION 14
COIN SYSTEM
========================================= */

function addCoins(amount) {

    if(!ACCOUNT.currentUser) return;

    ACCOUNT.currentUser.coins += amount;

    updateDatabaseUser();

    saveSession();

    loadProfileUI();

}

function spendCoins(amount) {

    if(!ACCOUNT.currentUser) return false;

    if(ACCOUNT.currentUser.coins < amount) {

        alert("Not enough coins");

        return false;

    }

    ACCOUNT.currentUser.coins -= amount;

    updateDatabaseUser();

    saveSession();

    loadProfileUI();

    return true;

}


/* =========================================
SECTION 15
GEM SYSTEM
========================================= */

function addGems(amount) {

    if(!ACCOUNT.currentUser) return;

    ACCOUNT.currentUser.gems += amount;

    updateDatabaseUser();

    saveSession();

    loadProfileUI();

}


/* =========================================
SECTION 16
FRIEND SYSTEM
========================================= */

function addFriend(friendName) {

    if(!ACCOUNT.currentUser) return;

    ACCOUNT.currentUser.friends.push(friendName);

    updateDatabaseUser();

    saveSession();

}


/* =========================================
SECTION 17
AVATAR SYSTEM
========================================= */

function changeAvatar(emoji) {

    if(!ACCOUNT.currentUser) return;

    ACCOUNT.currentUser.avatar = emoji;

    updateDatabaseUser();

    saveSession();

}


/* =========================================
SECTION 18
ACHIEVEMENT SYSTEM
========================================= */

function unlockAchievement(name) {

    if(!ACCOUNT.currentUser) return;

    if(
        ACCOUNT.currentUser.achievements.includes(name)
    ) return;

    ACCOUNT.currentUser.achievements.push(name);

    updateDatabaseUser();

    saveSession();

    alert("🏆 Achievement Unlocked");

}


/* =========================================
SECTION 19
DELETE ACCOUNT SYSTEM
========================================= */

function deleteAccount() {

    if(ACCOUNT.guest) {

        alert("Guest account cannot be deleted");

        return;

    }

    const confirmDelete =
    confirm(
        "Delete Account Permanently?"
    );

    if(!confirmDelete) return;

    ACCOUNT.users =
    ACCOUNT.users.filter(
        user =>
        user.id !== ACCOUNT.currentUser.id
    );

    saveUsersDatabase();

    logoutAccount();

}


/* =========================================
SECTION 20
ONLINE STATUS SYSTEM
========================================= */

function setOnlineStatus(status) {

    if(!ACCOUNT.currentUser) return;

    ACCOUNT.currentUser.online = status;

    updateDatabaseUser();

}


/* =========================================
SECTION 21
AUTO SAVE PROFILE
========================================= */

setInterval(() => {

    if(ACCOUNT.loggedIn) {

        saveSession();

        updateDatabaseUser();

    }

},30000);


/* =========================================
SECTION 22
RESTORE PROFILE UI
========================================= */

window.addEventListener("load",() => {

    loadSession();

    if(ACCOUNT.loggedIn) {

        loadProfileUI();

    }

});


/* =========================================
SECTION 23
DEBUG SYSTEM
========================================= */

function debugAccount() {

    console.log(ACCOUNT);

}


/* =========================================
SECTION 24
EXPORT ACCOUNT
========================================= */

function exportAccountData() {

    if(!ACCOUNT.currentUser) return;

    const data =
    JSON.stringify(
        ACCOUNT.currentUser,
        null,
        2
    );

    const blob =
    new Blob([data],{
        type:"application/json"
    });

    const url =
    URL.createObjectURL(blob);

    const a =
    document.createElement("a");

    a.href = url;

    a.download =
    "infinitix-account.json";

    a.click();

}


/* =========================================
SECTION 25
IMPORT ACCOUNT
========================================= */

function importAccountData(file) {

    const reader =
    new FileReader();

    reader.onload = function(event) {

        try {

            const imported =
            JSON.parse(event.target.result);

            ACCOUNT.currentUser = imported;

            saveSession();

            loadProfileUI();

            alert("Imported Successfully");

        }

        catch {

            alert("Invalid File");

        }

    };

    reader.readAsText(file);

}


/* =========================================
SECTION 26
FINAL ENGINE START
========================================= */

console.log(
    "✅ account.js loaded successfully"
);
