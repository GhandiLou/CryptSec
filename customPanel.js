// Customization panel logic for colors, matrix speed, glow, ambient sound

document.addEventListener('DOMContentLoaded', () => {
  const panel = document.getElementById('customPanel');
  const btn = document.getElementById('customPanelBtn');
  const closeBtn = document.getElementById('closePanelBtn');
  const bgTopInput = document.getElementById('bgTopColor');
  const bgBottomInput = document.getElementById('bgBottomColor');
  const speedInput = document.getElementById('matrixSpeed');
  const glowCheckbox = document.getElementById('glowToggle');
  const ambientSoundCheckbox = document.getElementById('ambientSoundToggle');

  // Toggle panel visibility
  btn.addEventListener('click', () => {
    panel.classList.toggle('hidden');
  });
  closeBtn.addEventListener('click', () => {
    panel.classList.add('hidden');
  });

  // Background color update
  function updateBackground() {
    const topColor = bgTopInput.value;
    const bottomColor = bgBottomInput.value;
    document.body.style.background = `linear-gradient(to bottom, ${topColor} 0%, ${bottomColor} 100%)`;
  }

  bgTopInput.addEventListener('input', updateBackground);
  bgBottomInput.addEventListener('input', updateBackground);

  // Initialize background on load
  updateBackground();

  // Matrix speed control
  speedInput.addEventListener('input', () => {
    if (window.matrixOptions && typeof window.matrixOptions.setSpeed === 'function') {
      window.matrixOptions.setSpeed(parseInt(speedInput.value));
    }
  });

  // Matrix glow toggle
  glowCheckbox.addEventListener('change', () => {
    if (window.matrixOptions && typeof window.matrixOptions.setGlow === 'function') {
      window.matrixOptions.setGlow(glowCheckbox.checked);
    }
  });

  // Ambient sound toggle (communicate with soundToggle.js)
  ambientSoundCheckbox.addEventListener('change', () => {
    if (window.toggleAmbientSound) {
      window.toggleAmbientSound(ambientSoundCheckbox.checked);
    }
  });
});
