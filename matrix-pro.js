(() => {
  const canvas = document.getElementById('matrixCanvas');
  const ctx = canvas.getContext('2d');
  let width, height;
  let columns;
  let drops;
  let matrixChars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%&*';

  let glowIntensity = 15;
  let speed = 1;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight * 4; // taller for scrolling effect
    canvas.width = width;
    canvas.height = height;
    columns = Math.floor(width / 20);
    drops = Array(columns).fill(1);
  }
  window.addEventListener('resize', resize);
  resize();

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, width, height);

    ctx.font = '20px Share Tech Mono';
    ctx.shadowColor = '#0f0';
    ctx.shadowBlur = glowIntensity;

    for (let i = 0; i < columns; i++) {
      let text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
      ctx.fillStyle = '#0f0';
      ctx.fillText(text, i * 20, drops[i] * 20);

      // clickable area for mini particle burst (approx)
      matrixPositions[i] = drops[i] * 20;

      drops[i] += speed;
      if (drops[i] * 20 > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
    }
  }

  // Track last clicked positions for particle bursts
  const particles = [];
  const matrixPositions = [];

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 2;
      this.speedY = (Math.random() - 1.5) * 2;
      this.alpha = 1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.alpha -= 0.02;
      this.size *= 0.95;
    }
    draw() {
      ctx.fillStyle = `rgba(0,255,0,${this.alpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw();
      if (particles[i].alpha <= 0) {
        particles.splice(i, 1);
      }
    }
  }

  function animate() {
    if (!active) {
      ctx.clearRect(0, 0, width, height);
      return;
    }
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, width, height);

    ctx.font = '20px Share Tech Mono';
    ctx.shadowColor = '#0f0';
    ctx.shadowBlur = glowIntensity;

    for (let i = 0; i < columns; i++) {
      let text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
      ctx.fillStyle = '#0f0';
      let x = i * 20;
      let y = drops[i] * 20;
      ctx.fillText(text, x, y);
      matrixPositions[i] = y;

      drops[i] += speed;
      if (y > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
    }
    drawParticles();
    requestAnimationFrame(animate);
  }

  let active = false;
  window.matrixController = {
    setA
