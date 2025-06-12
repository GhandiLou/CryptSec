// Matrix rain animation on black background with glow effect

(() => {
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');

  let width, height;
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  resize();
  window.addEventListener('resize', resize);

  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()-_=+[]{}<>?/|\\'.split('');
  const fontSize = 20;
  const columns = Math.floor(width / fontSize);

  // Array of y positions for each column
  const drops = new Array(columns).fill(1);

  // Options controlled by custom panel
  let speed = 12; // default speed
  let glowEnabled = true;

  // Listen for updates from customPanel.js
  window.matrixOptions = {
    setSpeed: (val) => { speed = val; },
    setGlow: (val) => { glowEnabled = val; }
  };

  function draw() {
    // Black background with slight opacity for trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);

    ctx.font = fontSize + 'px Courier New';
    ctx.textBaseline = 'top';

    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      if (glowEnabled) {
        ctx.shadowColor = '#0f0';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#00ff00';
      } else {
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#0f0';
      }

      ctx.fillText(text, x, y);

      if (y > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  function loop() {
    draw();
    setTimeout(() => requestAnimationFrame(loop), 1000 / speed);
  }

  loop();
})();
