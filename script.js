/* ---------------- TEXT + SOUND ---------------- */

const chaosChars = "!@#$%^&*()_+=-<>?/|{}[]★☆";
const song = document.getElementById("christmasSong");

function fitGlitchText() {
  const el = document.getElementById("glitchText");
  if (!el) return;

  el.style.fontSize = "";
  el.style.letterSpacing = "";

  const maxWidth = window.innerWidth * 0.96;
  let fontSize = parseFloat(getComputedStyle(el).fontSize);
  let letterSpacing = parseFloat(getComputedStyle(el).letterSpacing);

  while (el.scrollWidth > maxWidth && fontSize > 16) {
    fontSize -= 1;
    el.style.fontSize = fontSize + "px";

    if (letterSpacing > 1) {
      letterSpacing -= 0.2;
      el.style.letterSpacing = letterSpacing + "px";
    }
  }
}

function generateText() {
  const name = document.getElementById("nameInput").value || "FRIEND";
  const text = `MERRY CHRISTMAS ${name.toUpperCase()}`;
  const el = document.getElementById("glitchText");

  el.setAttribute("data-text", text);
  el.innerText = text;

  fitGlitchText();

  if (song.paused) {
    song.play().catch(() => {});
  }

  let iterations = 0;

  const interval = setInterval(() => {
    el.innerText = text
      .split("")
      .map((char, i) =>
        i < iterations
          ? char
          : chaosChars[Math.floor(Math.random() * chaosChars.length)]
      )
      .join("");

    iterations += 0.5;
    if (iterations >= text.length) {
      el.innerText = text;
      clearInterval(interval);
    }
  }, 40);
}

window.addEventListener("resize", fitGlitchText);
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", fitGlitchText);
}

/* ---------------- SNOW ---------------- */

const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.visualViewport
    ? window.visualViewport.height
    : window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let snowflakes = [];

function initSnow() {
  snowflakes = [];
  for (let i = 0; i < 120; i++) {
    snowflakes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      d: Math.random() + 1
    });
  }
}

initSnow();

let angle = 0;

function drawSnow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.beginPath();

  snowflakes.forEach(flake => {
    ctx.moveTo(flake.x, flake.y);
    ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
  });

  ctx.fill();

  angle += 0.01;
  snowflakes.forEach(flake => {
    flake.y += flake.d * flake.d + 1;
    flake.x += Math.sin(angle) * 0.5;

    if (flake.y > canvas.height) {
      flake.y = 0;
      flake.x = Math.random() * canvas.width;
    }
  });
}

setInterval(drawSnow, 30);
