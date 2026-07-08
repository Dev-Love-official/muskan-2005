let selectedActivity = "";
let selectedDate = "";
let score = 0;
let yesScale = 1;
let noAttempts = 0;
let gameTimer = null;

const noBtn = document.getElementById("noBtn");
const dateInput = document.getElementById("dateInput");
const noMessage = document.getElementById("noMessage");
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");

dateInput.min = new Date().toISOString().split("T")[0];

const noLines = [
  "No",
  "Are you sure? 🥺",
  "Think again 😭",
  "Teddy said wrong button 🧸",
  "Button is shy now",
  "No is on holiday ✈️",
  "System error: no not found",
  "Access denied 💖",
  "Try the pink button",
  "Muskan deserves yes 😌",
  "This button is running away",
  "404: No button missing"
];

function goTo(screenId) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  document.getElementById(screenId).classList.add("active");

  if (screenId === "miniGame") startGame();
  if (screenId === "letter") typeLetter();
  if (screenId === "final") showFinal();
}

function yesClicked() {
  goTo("miniGame");
}

function runAway() {
  noAttempts++;
  const screen = document.getElementById("question");
  const screenBox = screen.getBoundingClientRect();
  const btnBox = noBtn.getBoundingClientRect();

  const maxX = Math.max(40, screenBox.width - btnBox.width - 60);
  const maxY = Math.max(40, screenBox.height - btnBox.height - 80);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${Math.random() * maxX + 20}px`;
  noBtn.style.top = `${Math.random() * maxY + 20}px`;
  noBtn.textContent = noLines[Math.min(noAttempts, noLines.length - 1)];

  yesScale += 0.08;
  document.querySelector(".yes-btn").style.transform = `scale(${yesScale})`;

  const messages = [
    "The No button is getting nervous.",
    "Teddy committee rejected that choice.",
    "No button escaped successfully.",
    "This website legally prefers Yes.",
    "Cute warning: Yes button is growing."
  ];

  noMessage.textContent = messages[noAttempts % messages.length];

  if (noAttempts >= 8) {
    noBtn.textContent = "Okay fine... Yes 💗";
    noBtn.onclick = yesClicked;
  }

  dropEmoji("🧸");
}

noBtn.addEventListener("mouseenter", runAway);
noBtn.addEventListener("click", runAway);
noBtn.addEventListener("touchstart", runAway);

function startGame() {
  score = 0;
  document.getElementById("score").textContent = score;
  const gameArea = document.getElementById("gameArea");
  gameArea.querySelectorAll(".game-heart").forEach(h => h.remove());

  clearInterval(gameTimer);
  spawnHeart();
  gameTimer = setInterval(spawnHeart, 900);
}

function spawnHeart() {
  const gameArea = document.getElementById("gameArea");
  const heart = document.createElement("button");
  heart.className = "game-heart";
  heart.textContent = ["💖", "💘", "💗", "🧸"][Math.floor(Math.random() * 4)];

  const x = Math.random() * (gameArea.clientWidth - 60) + 10;
  const y = Math.random() * (gameArea.clientHeight - 90) + 50;

  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;

  heart.onclick = () => {
    score++;
    document.getElementById("score").textContent = score;
    heart.remove();
    dropEmoji("💖");

    if (score >= 5) {
      clearInterval(gameTimer);
      goTo("activity");
    }
  };

  gameArea.appendChild(heart);
  setTimeout(() => heart.remove(), 1700);
}

function skipGame() {
  clearInterval(gameTimer);
  goTo("activity");
}

function chooseActivity(activity) {
  selectedActivity = activity;
  goTo("date");
}

function saveDate() {
  if (!dateInput.value) {
    alert("Pick a date first 💗");
    return;
  }

  selectedDate = new Date(dateInput.value + "T00:00:00").toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  goTo("letter");
}

const letter = `Meri Pyari Muskan ❤️

Jadon ton tu meri life ch aayi aa, har din hor vi khoobsurat lagda hai.

Mera pyaar tere layi kade vi ghatt nahi hovega. Time badal sakda ae, halaat badal sakde ne, par mera dil hamesha tera hi rahega.

Tu mere layi duniya di sab ton sohni, sab ton pyari te sab ton precious woman ae.

Main tere naal sunsets dekhna chaunda haan, duniya travel karni chaunda haan, naviyaan memories banauniyan ne, te Rabb di mehar naal ik beautiful future build karna chaunda haan.

Hamesha hassdi reh. Teri smile meri favourite cheez ae.

Please never lose that beautiful heart that makes you... you.

I love you today. I will love you tomorrow. And I will keep loving you for the rest of my life.

Forever yours,
Lovedeep ❤️🧸`;

let typedStarted = false;

function typeLetter() {
  if (typedStarted) return;
  typedStarted = true;

  const output = document.getElementById("typedLetter");
  const btn = document.getElementById("letterBtn");
  output.textContent = "";
  btn.classList.add("hidden");

  let i = 0;
  const speed = 24;

  const typing = setInterval(() => {
    output.textContent += letter.charAt(i);
    i++;

    if (i >= letter.length) {
      clearInterval(typing);
      btn.classList.remove("hidden");
      celebrate(22);
    }
  }, speed);
}

function showFinal() {
  document.getElementById("activityResult").textContent = selectedActivity || "A cute surprise";
  document.getElementById("dateResult").textContent = selectedDate || "Soon";
  celebrate(70);
}

function celebrate(amount = 45) {
  for (let i = 0; i < amount; i++) {
    setTimeout(() => {
      const emojis = ["💖", "🧸", "✨", "🌹", "💌", "💕"];
      dropEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
    }, i * 65);
  }
}

function dropEmoji(emoji) {
  const item = document.createElement("span");
  item.className = "falling";
  item.textContent = emoji;
  item.style.left = Math.random() * 100 + "vw";
  item.style.fontSize = Math.random() * 20 + 22 + "px";
  item.style.animationDuration = Math.random() * 2.2 + 3 + "s";

  document.body.appendChild(item);
  setTimeout(() => item.remove(), 5600);
}

function downloadPlan() {
  const message =
`VIP DATE PASS 🎟️💖

Lovedeep × Muskan

Plan: ${selectedActivity || "A cute surprise"}
Date: ${selectedDate || "Soon"}
Dress code: Smile required, teddy optional 🧸
Status: Date saved, heart approved 💖✅

Forever yours,
Lovedeep ❤️`;

  const blob = new Blob([message], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "our-date-plan.txt";
  a.click();

  URL.revokeObjectURL(url);
}

function restart() {
  typedStarted = false;
  selectedActivity = "";
  selectedDate = "";
  score = 0;
  yesScale = 1;
  noAttempts = 0;
  noBtn.textContent = "No";
  noBtn.onclick = null;
  noBtn.style.position = "relative";
  noBtn.style.left = "auto";
  noBtn.style.top = "auto";
  document.querySelector(".yes-btn").style.transform = "scale(1)";
  goTo("splash");
}

musicBtn.addEventListener("click", async () => {
  try {
    if (bgMusic.paused) {
      await bgMusic.play();
      musicBtn.textContent = "🔇";
    } else {
      bgMusic.pause();
      musicBtn.textContent = "🎵";
    }
  } catch (error) {
    alert("Add a music file named music.mp3 inside the assets folder first 🎵");
  }
});


async function copyPlan() {
  const message =
`VIP DATE PASS 🎟️💖

Lovedeep × Muskan

Plan: ${selectedActivity || "A cute surprise"}
Date: ${selectedDate || "Soon"}
Dress code: Smile required, teddy optional 🧸
Status: Date saved, heart approved 💖✅`;

  try {
    await navigator.clipboard.writeText(message);
    alert("Plan copied 💖");
  } catch (error) {
    alert(message);
  }
}
