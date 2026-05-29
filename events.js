/* =========================================
INFINITIX SKY V3.2
events.js
REAL PLATFORM VERSION
========================================= */


/* =========================================
SECTION 1
EVENT ENGINE CORE
========================================= */

const EVENTS = {

    activeEvents: [],

    completedEvents: [],

    seasonalEvents: [],

    missions: [],

    initialized: false

};

console.log("🎉 Events Engine Loaded");


/* =========================================
SECTION 2
INITIALIZE EVENTS
========================================= */

function initializeEvents() {

    EVENTS.initialized = true;

    loadSavedEvents();

    console.log("✅ Events Initialized");

}

initializeEvents();


/* =========================================
SECTION 3
CREATE EVENT
========================================= */

function createEvent(

    title,

    description,

    duration

) {

    const event = {

        id: "EVENT_" + Date.now(),

        title,

        description,

        duration,

        startTime: Date.now(),

        completed: false,

        rewards: []

    };

    EVENTS.activeEvents.push(event);

    saveEvents();

    renderEvents();

}


/* =========================================
SECTION 4
DELETE EVENT
========================================= */

function deleteEvent(eventId) {

    EVENTS.activeEvents =

    EVENTS.activeEvents.filter(

        event => event.id !== eventId

    );

    saveEvents();

    renderEvents();

}


/* =========================================
SECTION 5
COMPLETE EVENT
========================================= */

function completeEvent(eventId) {

    const event =

    EVENTS.activeEvents.find(

        e => e.id === eventId

    );

    if(!event) return;

    event.completed = true;

    EVENTS.completedEvents.push(event);

    saveEvents();

    renderEvents();

    alert("🏆 Event Completed");

}


/* =========================================
SECTION 6
RENDER EVENTS
========================================= */

function renderEvents() {

    const container =

    document.getElementById("eventsContainer");

    if(!container) return;

    container.innerHTML = "";

    EVENTS.activeEvents.forEach(event => {

        const div =

        document.createElement("div");

        div.className = "eventCard";

        div.innerHTML = `

            <h3>${event.title}</h3>

            <p>${event.description}</p>

            <button onclick="completeEvent('${event.id}')">
                Complete
            </button>

        `;

        container.appendChild(div);

    });

}


/* =========================================
SECTION 7
SAVE EVENTS
========================================= */

function saveEvents() {

    localStorage.setItem(

        "infinitix_events",

        JSON.stringify(EVENTS)

    );

}


/* =========================================
SECTION 8
LOAD SAVED EVENTS
========================================= */

function loadSavedEvents() {

    const saved = JSON.parse(

        localStorage.getItem(
            "infinitix_events"
        )

    );

    if(saved) {

        Object.assign(EVENTS,saved);

    }

}


/* =========================================
SECTION 9
SEASONAL EVENTS
========================================= */

function addSeasonalEvent(name) {

    EVENTS.seasonalEvents.push({

        id: "SEASON_" + Date.now(),

        name,

        active: true

    });

    saveEvents();

}


/* =========================================
SECTION 10
EVENT TIMER SYSTEM
========================================= */

function getRemainingTime(event) {

    const now = Date.now();

    const passed = now - event.startTime;

    const remaining =

    event.duration - passed;

    return remaining;

}


/* =========================================
SECTION 11
MISSION SYSTEM
========================================= */

function createMission(

    title,

    target,

    reward

) {

    EVENTS.missions.push({

        id: "MISSION_" + Date.now(),

        title,

        target,

        progress: 0,

        reward,

        completed: false

    });

    saveEvents();

}


/* =========================================
SECTION 12
UPDATE MISSION PROGRESS
========================================= */

function updateMission(

    missionId,

    amount

) {

    const mission =

    EVENTS.missions.find(

        m => m.id === missionId

    );

    if(!mission) return;

    mission.progress += amount;

    if(

        mission.progress >= mission.target

    ) {

        mission.completed = true;

        alert("🎯 Mission Completed");

    }

    saveEvents();

}


/* =========================================
SECTION 13
CLAIM REWARD SYSTEM
========================================= */

function claimReward(missionId) {

    const mission =

    EVENTS.missions.find(

        m => m.id === missionId

    );

    if(!mission) return;

    if(!mission.completed) {

        alert("Mission not completed");

        return;

    }

    addCoins(mission.reward);

    alert("💰 Reward Claimed");

}


/* =========================================
SECTION 14
DAILY REWARD SYSTEM
========================================= */

function claimDailyReward() {

    const today =

    new Date().toDateString();

    const claimed =

    localStorage.getItem(
        "daily_reward_date"
    );

    if(claimed === today) {

        alert("Already claimed today");

        return;

    }

    addCoins(100);

    localStorage.setItem(

        "daily_reward_date",

        today

    );

    alert("🎁 Daily Reward Claimed");

}


/* =========================================
SECTION 15
EVENT NOTIFICATION SYSTEM
========================================= */

function eventNotify(text) {

    console.log("🎉",text);

}


/* =========================================
SECTION 16
LIMITED TIME EVENT SYSTEM
========================================= */

function createLimitedEvent(

    title,

    endDate

) {

    EVENTS.activeEvents.push({

        id: "LIMITED_" + Date.now(),

        title,

        endDate,

        limited: true

    });

    saveEvents();

}


/* =========================================
SECTION 17
CHECK EXPIRED EVENTS
========================================= */

function checkExpiredEvents() {

    const now = Date.now();

    EVENTS.activeEvents =

    EVENTS.activeEvents.filter(event => {

        if(event.endDate) {

            return new Date(event.endDate)
            .getTime() > now;

        }

        return true;

    });

    saveEvents();

}


/* =========================================
SECTION 18
EVENT LEADERBOARD
========================================= */

const EVENT_LEADERBOARD = [];

function addEventScore(

    username,

    score

) {

    EVENT_LEADERBOARD.push({

        username,

        score

    });

}


/* =========================================
SECTION 19
SORT EVENT LEADERBOARD
========================================= */

function sortEventLeaderboard() {

    EVENT_LEADERBOARD.sort(

        (a,b) => b.score - a.score

    );

}


/* =========================================
SECTION 20
SPECIAL REWARD SYSTEM
========================================= */

function giveSpecialReward(item) {

    if(!ACCOUNT.currentUser) return;

    ACCOUNT.currentUser.inventory.push(item);

    updateDatabaseUser();

}


/* =========================================
SECTION 21
EVENT XP SYSTEM
========================================= */

function rewardEventXP(amount) {

    addXP(amount);

}


/* =========================================
SECTION 22
AUTO EVENT SAVE
========================================= */

setInterval(() => {

    saveEvents();

},30000);


/* =========================================
SECTION 23
EVENT SEARCH SYSTEM
========================================= */

function searchEvents(query) {

    return EVENTS.activeEvents.filter(

        event =>

        event.title
        .toLowerCase()
        .includes(
            query.toLowerCase()
        )

    );

}


/* =========================================
SECTION 24
EVENT FILTER SYSTEM
========================================= */

function filterCompletedEvents() {

    return EVENTS.completedEvents;

}


/* =========================================
SECTION 25
EVENT PARTICIPATION SYSTEM
========================================= */

function joinEvent(eventId) {

    console.log(

        "Joined Event:",

        eventId

    );

}


/* =========================================
SECTION 26
EVENT EXIT SYSTEM
========================================= */

function leaveEvent(eventId) {

    console.log(

        "Left Event:",

        eventId

    );

}


/* =========================================
SECTION 27
LIVE EVENT STATUS
========================================= */

function getEventStatus(eventId) {

    const event =

    EVENTS.activeEvents.find(

        e => e.id === eventId

    );

    if(!event) return "Unknown";

    return event.completed ?

    "Completed" :

    "Active";

}


/* =========================================
SECTION 28
EVENT DEBUG SYSTEM
========================================= */

function debugEvents() {

    console.log(EVENTS);

}


/* =========================================
SECTION 29
RENDER MISSIONS
========================================= */

function renderMissions() {

    const container =

    document.getElementById("missionsContainer");

    if(!container) return;

    container.innerHTML = "";

    EVENTS.missions.forEach(mission => {

        const div =

        document.createElement("div");

        div.className = "missionCard";

        div.innerHTML = `

            <h3>${mission.title}</h3>

            <p>
            ${mission.progress}
            /
            ${mission.target}
            </p>

        `;

        container.appendChild(div);

    });

}


/* =========================================
SECTION 30
FINAL ENGINE START
========================================= */

window.addEventListener("load",() => {

    renderEvents();

    renderMissions();

});

console.log(

    "✅ events.js loaded successfully"

);
