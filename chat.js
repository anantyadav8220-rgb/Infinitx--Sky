/* =========================================
INFINITIX SKY V3.2
chat.js
REAL PLATFORM VERSION
========================================= */


/* =========================================
SECTION 1
CHAT ENGINE CORE
========================================= */

const CHAT = {

    initialized: false,

    globalMessages: [],

    roomMessages: {},

    activeRoom: "global",

    voiceEnabled: false,

    mutedUsers: [],

    blockedUsers: []

};

console.log("💬 Chat Engine Loaded");


/* =========================================
SECTION 2
INITIALIZE CHAT
========================================= */

function initializeChat() {

    CHAT.initialized = true;

    loadChatHistory();

    console.log("✅ Chat Initialized");

}

initializeChat();


/* =========================================
SECTION 3
SEND GLOBAL MESSAGE
========================================= */

function sendGlobalMessage() {

    const input =
    document.getElementById("chatInput");

    if(!input) return;

    const message =
    input.value.trim();

    if(message === "") return;

    const data = {

        id: "MSG_" + Date.now(),

        user:
        ACCOUNT.currentUser?.username ||
        "Guest",

        text: message,

        time: new Date().toLocaleTimeString()

    };

    CHAT.globalMessages.push(data);

    displayMessage(data);

    saveChatHistory();

    input.value = "";

}


/* =========================================
SECTION 4
DISPLAY MESSAGE
========================================= */

function displayMessage(data) {

    const chatBox =
    document.getElementById("chatBox");

    if(!chatBox) return;

    const div =
    document.createElement("div");

    div.className = "chatMessage";

    div.innerHTML = `

        <div class="chatUser">
            ${data.user}
        </div>

        <div class="chatText">
            ${data.text}
        </div>

        <div class="chatTime">
            ${data.time}
        </div>

    `;

    chatBox.appendChild(div);

    chatBox.scrollTop =
    chatBox.scrollHeight;

}


/* =========================================
SECTION 5
LOAD CHAT HISTORY
========================================= */

function loadChatHistory() {

    const saved =
    JSON.parse(

        localStorage.getItem(
            "infinitix_chat_history"
        )

    );

    if(!saved) return;

    CHAT.globalMessages = saved;

}


/* =========================================
SECTION 6
SAVE CHAT HISTORY
========================================= */

function saveChatHistory() {

    localStorage.setItem(

        "infinitix_chat_history",

        JSON.stringify(
            CHAT.globalMessages
        )

    );

}


/* =========================================
SECTION 7
RENDER CHAT HISTORY
========================================= */

function renderChatHistory() {

    const chatBox =
    document.getElementById("chatBox");

    if(!chatBox) return;

    chatBox.innerHTML = "";

    CHAT.globalMessages.forEach(

        message => {

            displayMessage(message);

        }

    );

}


/* =========================================
SECTION 8
CLEAR CHAT
========================================= */

function clearChat() {

    CHAT.globalMessages = [];

    saveChatHistory();

    renderChatHistory();

}


/* =========================================
SECTION 9
ROOM CHAT SYSTEM
========================================= */

function createChatRoom(roomName) {

    if(!CHAT.roomMessages[roomName]) {

        CHAT.roomMessages[roomName] = [];

    }

}

function switchRoom(roomName) {

    CHAT.activeRoom = roomName;

    console.log("🏠 Switched Room:",roomName);

}


/* =========================================
SECTION 10
SEND ROOM MESSAGE
========================================= */

function sendRoomMessage(room,message) {

    if(!CHAT.roomMessages[room]) {

        CHAT.roomMessages[room] = [];

    }

    CHAT.roomMessages[room].push({

        user:
        ACCOUNT.currentUser?.username ||
        "Guest",

        text: message,

        time: Date.now()

    });

}


/* =========================================
SECTION 11
EMOJI SYSTEM
========================================= */

const CHAT_EMOJIS = [

    "😀",

    "🔥",

    "🎮",

    "🚀",

    "💎",

    "❤️",

    "👀",

    "😎"

];

function addEmoji(emoji) {

    const input =
    document.getElementById("chatInput");

    if(!input) return;

    input.value += emoji;

}


/* =========================================
SECTION 12
MESSAGE FILTER SYSTEM
========================================= */

const BAD_WORDS = [

    "badword1",

    "badword2"

];

function filterMessage(text) {

    let filtered = text;

    BAD_WORDS.forEach(word => {

        filtered =
        filtered.replaceAll(

            word,

            "***"

        );

    });

    return filtered;

}


/* =========================================
SECTION 13
USER MUTE SYSTEM
========================================= */

function muteUser(username) {

    if(

        CHAT.mutedUsers.includes(username)

    ) return;

    CHAT.mutedUsers.push(username);

}

function unmuteUser(username) {

    CHAT.mutedUsers =

    CHAT.mutedUsers.filter(

        user => user !== username

    );

}


/* =========================================
SECTION 14
BLOCK SYSTEM
========================================= */

function blockUser(username) {

    if(

        CHAT.blockedUsers.includes(username)

    ) return;

    CHAT.blockedUsers.push(username);

}

function unblockUser(username) {

    CHAT.blockedUsers =

    CHAT.blockedUsers.filter(

        user => user !== username

    );

}


/* =========================================
SECTION 15
VOICE CHAT SYSTEM
========================================= */

function enableVoiceChat() {

    CHAT.voiceEnabled = true;

    console.log("🎤 Voice Chat Enabled");

}

function disableVoiceChat() {

    CHAT.voiceEnabled = false;

    console.log("🔇 Voice Chat Disabled");

}


/* =========================================
SECTION 16
VOICE MESSAGE SYSTEM
========================================= */

function sendVoiceMessage() {

    console.log("🎙️ Recording Voice...");

}


/* =========================================
SECTION 17
CHAT NOTIFICATION SYSTEM
========================================= */

function chatNotification(text) {

    console.log("💬 Notification:",text);

}


/* =========================================
SECTION 18
ONLINE USERS SYSTEM
========================================= */

const ONLINE_CHAT_USERS = [];

function userJoinedChat(username) {

    ONLINE_CHAT_USERS.push(username);

}

function userLeftChat(username) {

    const index =

    ONLINE_CHAT_USERS.indexOf(username);

    if(index !== -1) {

        ONLINE_CHAT_USERS.splice(index,1);

    }

}


/* =========================================
SECTION 19
SEARCH CHAT SYSTEM
========================================= */

function searchMessages(query) {

    return CHAT.globalMessages.filter(

        message =>

        message.text
        .toLowerCase()
        .includes(
            query.toLowerCase()
        )

    );

}


/* =========================================
SECTION 20
PIN MESSAGE SYSTEM
========================================= */

const PINNED_MESSAGES = [];

function pinMessage(message) {

    PINNED_MESSAGES.push(message);

}


/* =========================================
SECTION 21
DELETE MESSAGE SYSTEM
========================================= */

function deleteMessage(messageId) {

    CHAT.globalMessages =

    CHAT.globalMessages.filter(

        msg => msg.id !== messageId

    );

    saveChatHistory();

    renderChatHistory();

}


/* =========================================
SECTION 22
AUTO CHAT SAVE
========================================= */

setInterval(() => {

    saveChatHistory();

},30000);


/* =========================================
SECTION 23
CHAT SETTINGS
========================================= */

const CHAT_SETTINGS = {

    notifications: true,

    sound: true,

    compactMode: false

};


/* =========================================
SECTION 24
SAVE CHAT SETTINGS
========================================= */

function saveChatSettings() {

    localStorage.setItem(

        "infinitix_chat_settings",

        JSON.stringify(
            CHAT_SETTINGS
        )

    );

}


/* =========================================
SECTION 25
LOAD CHAT SETTINGS
========================================= */

function loadChatSettings() {

    const saved =
    JSON.parse(

        localStorage.getItem(
            "infinitix_chat_settings"
        )

    );

    if(saved) {

        Object.assign(

            CHAT_SETTINGS,

            saved

        );

    }

}

loadChatSettings();


/* =========================================
SECTION 26
CHAT SOUND SYSTEM
========================================= */

function playChatSound() {

    if(!CHAT_SETTINGS.sound) return;

    console.log("🔊 Chat Sound");

}


/* =========================================
SECTION 27
TYPING INDICATOR SYSTEM
========================================= */

function showTyping(username) {

    console.log(username + " is typing...");

}


/* =========================================
SECTION 28
MESSAGE REACTION SYSTEM
========================================= */

function reactToMessage(

    messageId,

    emoji

) {

    console.log(

        "Reaction:",

        messageId,

        emoji

    );

}


/* =========================================
SECTION 29
DEBUG CHAT ENGINE
========================================= */

function debugChat() {

    console.log(CHAT);

}


/* =========================================
SECTION 30
FINAL ENGINE START
========================================= */

window.addEventListener("load",() => {

    renderChatHistory();

});

console.log(

    "✅ chat.js loaded successfully"

);
