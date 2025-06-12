const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const letters = 'アカサタナハマヤラワABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%';
const matrix = letters.split('');
const fontSize = 16;
const columns = Math.floor(width / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.075)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < drops.length; i++) {
    const text = matrix[Math.floor(Math.random() * matrix.length)];

    // Set random green shades for glow effect
    const greenShade = 150 + Math.floor(Math.random() * 105);
    ctx.fillStyle = `rgb(0, ${greenShade}, 0)`;
    ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;
    ctx.shadowColor = `rgb(0, ${greenShade}, 0)`;
    ctx.shadowBlur = 10;

    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

let interval = null;

function startMatrix() {
  canvas.style.display = 'block';
  if (!interval) {
    interval = setInterval(drawMatrix, 50);
  }
}

function stopMatrix() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
  ctx.clearRect(0, 0, width, height);
  canvas.style.display = 'none';
}

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const triggerPoint = document.body.scrollHeight - window.innerHeight * 1.5;

  if (scrollY > triggerPoint) {
    startMatrix();
  } else {
    stopMatrix();
  }
});

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});
