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
  // Use floats for drops to enable fractional movement
  const drops = new Array(columns).fill(0);

  // Speed in lines per frame (smaller = slower)
  const speed = 0.15;

  function draw() {
    // Clear full canvas with solid black (no trail, no glow)
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);

    // Disable shadows
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.font = fontSize + 'px Courier New';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#0f0';  // bright green, no transparency

    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.fillText(text, x, y);

      // Increment drop by fractional speed
      drops[i] += speed;

      // Reset drop if off screen, randomize reset chance for natural effect
      if (y > height && Math.random() > 0.975) drops[i] = 0;
    }
  }

  function loop() {
    draw();
    requestAnimationFrame(loop);
  }
  loop();
})();
