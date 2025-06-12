(() => {
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');
  let width, height;
  let frameCount = 0;  // Frame counter

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
  const drops = new Array(columns).fill(1);

  function draw() {
    frameCount++;

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

      // Update drops every 4 frames (adjust this number to slow down or speed up)
      if (frameCount % 4 === 0) {
        if (y > height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }
  }

  function loop() {
    draw();
    requestAnimationFrame(loop);
  }
  loop();
})();
