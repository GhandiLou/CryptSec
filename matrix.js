const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const letters = 'アカサタナハマヤラワABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%';
const matrix = letters.split('');
const fontSize = 14;
const columns = width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#0F0';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = matrix[Math.floor(Math.random() * matrix.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

let interval;

function startMatrix() {
  canvas.style.display = 'block';
  interval = setInterval(drawMatrix, 50);
}

function stopMatrix() {
  clearInterval(interval);
  ctx.clearRect(0, 0, width, height);
  canvas.style.display = 'none';
}

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const triggerPoint = document.body.scrollHeight - window.innerHeight * 1.5;

  if (scrollY > triggerPoint) {
    if (!interval) startMatrix();
  } else {
    if (interval) stopMatrix();
  }
});

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});
