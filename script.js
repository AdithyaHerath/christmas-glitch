/* ---------------- TEXT + SOUND ---------------- */

const chaosChars = "!@#$%^&*()_+=-<>?/|{}[]★☆goPOP";
const sound = document.getElementById("glitchSound");

function generateText() {
  const name = document.getElementById("nameInput").value || "FRIEND";
  const text = `MERRY CHRISTMAS ${name.toUpperCase()}`;
  const el = document.getElementById("glitchText");

  el.setAttribute("data-text", text);
  sound.currentTime = 0;
  sound.play();

  let iterations = 0;

  const interval = setInterval(() => {
    el.innerText = text
      .split("")
      .map((char, i) => {
        if (i < iterations) return char;
        return chaosChars[Math.floor(Math.random() * chaosChars.length)];
      })
      .join("");

    iterations += 1 / 2;
    if (iterations >= text.length) clearInterval(interval);
  }, 40);
}

/* ---------------- FALLING SNOW ---------------- */

const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snowflakes = [];

for (let i = 0; i < 120; i++) {
  snowflakes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 3 + 1,
    d: Math.random() + 1
  });
}

function drawSnow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.beginPath();

  for (let flake of snowflakes) {
    ctx.moveTo(flake.x, flake.y);
    ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
  }

  ctx.fill();
  moveSnow();
}

let angle = 0;
function moveSnow() {
  angle += 0.01;
  for (let flake of snowflakes) {
    flake.y += Math.pow(flake.d, 2) + 1;
    flake.x += Math.sin(angle) * 0.5;

    if (flake.y > canvas.height) {
      flake.y = 0;
      flake.x = Math.random() * canvas.width;
    }
  }
}

setInterval(drawSnow, 30);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
