const skater = document.querySelector("#skater");

const obstacle = document.querySelector("#obstacle");
const obstacleImage = document.querySelector("#obstacleImage");

const startPauseBtn = document.querySelector("#startPauseBtn");

const jumpBtn = document.querySelector("#jumpBtn");
const downBtn = document.querySelector("#downBtn");

const scoreElement = document.querySelector("#score");
const message = document.querySelector("#message");

const aboutBtn = document.querySelector("#aboutBtn");
const helpBtn = document.querySelector("#helpBtn");

const highScoreElement = document.querySelector("#highScore");
const stageWrapper = document.querySelector("#stageWrapper");
const stageEl = document.querySelector(".stage");

const STAGE_WIDTH = 1440;
const STAGE_HEIGHT = 1024;

function fitStage() {
  const availableWidth = window.innerWidth * 0.96;
  const usedByChrome = 64 + 35 + 90 + 40; // header + score bar + controls + breathing room
  const availableHeight = window.innerHeight - usedByChrome;

  const scale = Math.min(
    availableWidth / STAGE_WIDTH,
    availableHeight / STAGE_HEIGHT,
    1,
  );

  stageEl.style.transform = `scale(${scale})`;
  stageWrapper.style.width = STAGE_WIDTH * scale + "px";
  stageWrapper.style.height = STAGE_HEIGHT * scale + "px";
}

window.addEventListener("resize", fitStage);
fitStage(); // run once immediately on load

let highScore = Number(localStorage.getItem("skaterHighScore")) || 0;
highScoreElement.textContent = highScore;

/* ===== GAME STATE ===== */

let obstacleSpeed = 2.4;

let gameRunning = false;
let gameOverState = false;

let score = 0;

let scoreInterval = null;
let collisionInterval = null;

let currentObstacle = null;

/* ===== OBSTACLE DATA ===== */

const OBSTACLE_TYPES = [
  {
    key: "mul",
    image: "assets/img/block-01-mul.svg",
    width: 65,
    height: 120,
    requiredAction: "jump",
    weight: 3, // <-- ADD THIS LINE to this object
  },
  {
    key: "bear",
    image: "assets/img/block-02-bear.svg",
    width: 144,
    height: 100,
    requiredAction: "jump",
    weight: 3, // <-- ADD THIS LINE to this object
  },
  {
    key: "missile",
    image: "assets/img/block-03-missile.svg",
    width: 200,
    height: 52,
    requiredAction: null,
    weight: 3, // <-- ADD THIS LINE to this object
  },
  {
    key: "missileMul",
    image: "assets/img/block-04-missileMul.svg",
    width: 200,
    height: 52,
    requiredAction: "jump",
    groundOffset: 20,
    minScore: 250,
    weight: 1, // this one you already added — leave as-is
  },
];

const MISSILE_ZONES = [
  { groundOffset: 20, requiredAction: "jump" }, // low — must jump over it
  { groundOffset: 50, requiredAction: "sit" }, // mid — must duck under it
  { groundOffset: 100, requiredAction: "none" }, // high — do nothing; jumping into it is the mistake
];

/* ===== START / PAUSE ===== */

startPauseBtn.addEventListener("click", () => {
  if (gameRunning) {
    pauseGame();
  } else {
    startGame();
  }
});

function startGame() {
  if (gameOverState) {
    score = 0;
    scoreElement.textContent = score;
    gameOverState = false;
  }

  gameRunning = true;
  startPauseBtn.textContent = "Pause";
  message.classList.add("hidden");

  resetSkater();
  spawnObstacle();

  clearInterval(scoreInterval);
  scoreInterval = setInterval(() => {
    score++;
    scoreElement.textContent = score;

    if (score > highScore) {
      highScore = score;
      highScoreElement.textContent = highScore;
      localStorage.setItem("skaterHighScore", highScore);
    }

    // Increase speed every 1000 points
    if (score % 1000 === 0) {
      obstacleSpeed -= 0.2;
      if (obstacleSpeed < 0.9) obstacleSpeed = 0.9;
    }
  }, 100);

  clearInterval(collisionInterval);
  collisionInterval = setInterval(() => {
    checkCollision();
  }, 20);
}

function pauseGame() {
  gameRunning = false;
  startPauseBtn.textContent = "Start";

  obstacle.classList.remove("move");

  clearInterval(scoreInterval);
  clearInterval(collisionInterval);
  clearJumpTimers();

  resetSkater();
}

/* ===== OBSTACLE SPAWN ===== */
function pickObstacleType() {
  const available = OBSTACLE_TYPES.filter(
    (t) => !t.minScore || score >= t.minScore,
  );

  const totalWeight = available.reduce((sum, t) => sum + (t.weight || 3), 0);
  let r = Math.random() * totalWeight;

  for (const t of available) {
    r -= t.weight || 3;
    if (r <= 0) return t;
  }
  return available[available.length - 1];
}

function spawnObstacle() {
  if (!gameRunning) return;

  const type = pickObstacleType();

  let groundOffset = type.groundOffset || 0;

  let requiredAction = type.requiredAction;

  if (type.key === "missile") {
    const zone =
      MISSILE_ZONES[Math.floor(Math.random() * MISSILE_ZONES.length)];
    groundOffset = zone.groundOffset;
    requiredAction = zone.requiredAction;
  }

  currentObstacle = { ...type, groundOffset, requiredAction };

  obstacleImage.src = type.image;
  obstacle.style.width = type.width + "px";
  obstacle.style.height = type.height + "px";
  obstacle.style.setProperty("--start-right", -(type.width + 20) + "px");
  obstacle.style.setProperty("--ground-offset", 310 + groundOffset + "px");
  obstacle.style.setProperty("--obstacle-duration", obstacleSpeed + "s");

  obstacle.classList.remove("move");
  void obstacle.offsetWidth;
  obstacle.classList.add("move");
}

obstacle.addEventListener("animationend", () => {
  if (!gameRunning) return;
  spawnObstacle();
});

/* ===== JUMP — 5-frame sequence ===== */

const JUMP_DURATION = 700; // ms — single source of truth, also set on --jump-duration

const JUMP_FRAMES = [
  { at: 0.0, src: "assets/img/skater-jump-01-anticipation.svg", w: 60, h: 70 },
  { at: 0.12, src: "assets/img/skater-jump-02-jumping.svg", w: 51, h: 80 },
  { at: 0.38, src: "assets/img/skater-jump-03-slowIn.svg", w: 62, h: 80 },
  { at: 0.62, src: "assets/img/skater-jump-04-stretched.svg", w: 72, h: 80 },
  { at: 0.85, src: "assets/img/skater-jump-05-AferAct.svg", w: 60, h: 70 },
];

const AIRBORNE_START = 0.12; // matches when the "jumping" frame begins
const AIRBORNE_END = 0.8; // grounded again just before landing settles

let isJumping = false;
let isAirborne = false;
let jumpTimeouts = [];

function setSkaterFrame(src, w, h) {
  skater.src = src;
  skater.style.width = w + "px";
  skater.style.height = h + "px";
}

jumpBtn.addEventListener("click", jump);

function jump() {
  if (!gameRunning || isSitting || isJumping) return;

  isJumping = true;
  skater.style.setProperty("--jump-duration", JUMP_DURATION + "ms");
  skater.classList.add("jumping");

  JUMP_FRAMES.forEach((frame) => {
    jumpTimeouts.push(
      setTimeout(() => {
        setSkaterFrame(frame.src, frame.w, frame.h);
      }, frame.at * JUMP_DURATION),
    );
  });

  jumpTimeouts.push(
    setTimeout(() => {
      isAirborne = true;
    }, AIRBORNE_START * JUMP_DURATION),
  );
  jumpTimeouts.push(
    setTimeout(() => {
      isAirborne = false;
    }, AIRBORNE_END * JUMP_DURATION),
  );

  jumpTimeouts.push(
    setTimeout(() => {
      isJumping = false;
      skater.classList.remove("jumping");
      setSkaterFrame("assets/img/skater.svg", 62, 80);
    }, JUMP_DURATION),
  );
}

function clearJumpTimers() {
  jumpTimeouts.forEach(clearTimeout);
  jumpTimeouts = [];
  isJumping = false;
  isAirborne = false;
  skater.classList.remove("jumping");
}

/* ===== KEYBOARD ===== */

document.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.code === "ArrowUp") {
    event.preventDefault();
    jump();
  }

  if (event.code === "ArrowDown") {
    event.preventDefault();
    startSit();
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "ArrowDown") {
    stopSit();
  }
});

/* ===== SIT — 2-frame sequence ===== */

const SIT_ANTICIPATION_MS = 130;
let isSitting = false;

downBtn.addEventListener("mousedown", startSit);
downBtn.addEventListener("mouseup", stopSit);
downBtn.addEventListener("mouseleave", stopSit);

downBtn.addEventListener("touchstart", (event) => {
  event.preventDefault();
  startSit();
});
downBtn.addEventListener("touchend", (event) => {
  event.preventDefault();
  stopSit();
});

function startSit() {
  if (!gameRunning || isJumping || isSitting) return;
  isSitting = true;

  setSkaterFrame("assets/img/skater-sitting-01-anticipation.svg", 60, 70);

  setTimeout(() => {
    if (isSitting) {
      setSkaterFrame("assets/img/skater-siting-02-action.svg", 66, 32);
    }
  }, SIT_ANTICIPATION_MS);
}

function stopSit() {
  if (!isSitting) return;
  isSitting = false;
  setSkaterFrame("assets/img/skater.svg", 62, 80);
}

/* ===== RESET ===== */

function resetSkater() {
  isSitting = false;
  clearJumpTimers();
  setSkaterFrame("assets/img/skater.svg", 62, 80);
}

/* ===== COLLISION ===== */

function checkCollision() {
  if (!gameRunning || !currentObstacle) return;

  const skaterRect = skater.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  const horizontalOverlap =
    skaterRect.right - 12 > obstacleRect.left + 8 &&
    skaterRect.left + 12 < obstacleRect.right - 8;

  if (!horizontalOverlap) return;

  const cleared =
    (currentObstacle.requiredAction === "jump" && isAirborne) ||
    (currentObstacle.requiredAction === "sit" && isSitting) ||
    (currentObstacle.requiredAction === "none" && !isAirborne);

  if (!cleared) gameOver();
}

/* ===== GAME OVER ===== */

function gameOver() {
  gameRunning = false;
  gameOverState = true;

  obstacle.classList.remove("move");

  clearInterval(scoreInterval);
  clearInterval(collisionInterval);
  clearJumpTimers();

  resetSkater();

  startPauseBtn.textContent = "Restart";

  message.innerHTML = `<p>Game Over — Score: ${score}</p>`;
  message.classList.remove("hidden");
}

/* ===== ABOUT / HELP ===== */

aboutBtn.addEventListener("click", () => {
  if (gameRunning) return;
  message.innerHTML = `<p>Skater Runner</p>`;
  message.classList.remove("hidden");
});

helpBtn.addEventListener("click", () => {
  if (gameRunning) return;
  message.innerHTML = `
    <p>
      Jump over the mul and the bear.<br>
      The missile flies at different heights —
      jump the low one, duck the mid one,
      leave the high one alone.
    </p>
  `;
  message.classList.remove("hidden");
});
