// Find the website screens
const screens = document.querySelectorAll(".screen");

// Function to switch between screens
function showScreen(screenId) {
    screens.forEach((screen) => {
        screen.classList.remove("active");
    });

    const nextScreen = document.getElementById(screenId);

    if (nextScreen) {
        nextScreen.classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        console.error("Screen not found:", screenId);
    }
}

// FIRST BUTTON: Welcome -> Reasons
const startButton = document.getElementById("startButton");

if (startButton) {
    startButton.addEventListener("click", () => {
        showScreen("reasonsScreen");
    });
} else {
    console.error("startButton was not found!");
}

// SECOND BUTTON: Reasons -> Crow
const crowButton = document.getElementById("crowButton");

if (crowButton) {
    crowButton.addEventListener("click", () => {
        showScreen("crowScreen");
    });
}

// THIRD BUTTON: Crow -> Game
const gameButton = document.getElementById("gameButton");

if (gameButton) {
    gameButton.addEventListener("click", () => {
        showScreen("gameScreen");
    });
}

// GAME ELEMENTS
const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const gameMessage = document.getElementById("gameMessage");
const playButton = document.getElementById("playButton");
const surpriseButton = document.getElementById("surpriseButton");

let score = 0;
let timeLeft = 30;
let gameRunning = false;
let timerInterval;
let spawnInterval;

function startGame() {
    if (gameRunning) return;

    score = 0;
    timeLeft = 30;
    gameRunning = true;

    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    gameMessage.textContent = "Catch those hearts, Jaijuuuuu! 💜";

    gameArea.innerHTML = "";

    playButton.classList.add("hidden");
    surpriseButton.classList.add("hidden");

    spawnInterval = setInterval(spawnHeart, 650);

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame(false);
        }
    }, 1000);
}

function spawnHeart() {
    if (!gameRunning) return;

    const heart = document.createElement("button");
    heart.className = "heart";
    heart.textContent = ["💜", "💗", "💖", "💕", "🪻"][
        Math.floor(Math.random() * 5)
    ];

    heart.setAttribute("aria-label", "Catch a heart");

    const maxX = Math.max(0, gameArea.clientWidth - 50);
    const maxY = Math.max(0, gameArea.clientHeight - 50);

    heart.style.left = Math.random() * maxX + "px";
    heart.style.top = Math.random() * maxY + "px";

    heart.addEventListener("click", () => {
        if (!gameRunning) return;

        score++;
        scoreDisplay.textContent = score;
        heart.remove();

        if (score >= 10) {
            endGame(true);
        }
    });

    gameArea.appendChild(heart);

    setTimeout(() => heart.remove(), 1800);
}

function endGame(won) {
    gameRunning = false;

    clearInterval(timerInterval);
    clearInterval(spawnInterval);

    gameArea.innerHTML = "";

    if (won) {
        gameMessage.textContent =
            "YOU DID IT! You caught all that love! 🥹💜";
        surpriseButton.textContent = "Unlock your surprise 💌";
        surpriseButton.classList.remove("hidden");
        playButton.classList.add("hidden");
    } else {
        gameMessage.textContent =
            "Time's up! Try again, or open your surprise anyway. 💜";
        playButton.textContent = "Try again! 💗";
        playButton.classList.remove("hidden");
        surpriseButton.textContent = "Open my surprise anyway 💌";
        surpriseButton.classList.remove("hidden");
    }
}

if (playButton) {
    playButton.addEventListener("click", startGame);
}

// GAME -> MAGIC SCREEN
if (surpriseButton) {
    surpriseButton.addEventListener("click", () => {
        showScreen("magicScreen");
    });
}

// MAGIC SCREEN -> LOVE LETTER
const letterButton = document.getElementById("letterButton");

if (letterButton) {
    letterButton.addEventListener("click", () => {
        showScreen("letterScreen");
    });
}

// VIRTUAL HUG
const hugButton = document.getElementById("hugButton");

if (hugButton) {
    hugButton.addEventListener("click", () => {
        document.getElementById("hugMessage").classList.remove("hidden");
        hugButton.textContent = "Hug delivered! 💜";
        makeParticles();
    });
}

// FLOATING FLOWERS AND HEARTS
function makeParticles() {
    const container = document.getElementById("particles");
    const symbols = ["💜", "💗", "🌸", "🪻", "✨"];

    for (let i = 0; i < 18; i++) {
        const particle = document.createElement("span");

        particle.className = "particle";
        particle.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        particle.style.left = Math.random() * 100 + "%";
        particle.style.fontSize = (14 + Math.random() * 16) + "px";
        particle.style.animationDuration = (3 + Math.random() * 4) + "s";

        container.appendChild(particle);

        setTimeout(() => particle.remove(), 7500);
    }
}

console.log("Jaijuuuuu's Purple Universe is ready! 💜");