const soundBtn = document.getElementById('soundToggle');
const ambientSound = document.getElementById('ambientSound');

soundBtn.addEventListener('click', () => {
  if (ambientSound.paused) {
    ambientSound.volume = 0.3;
    ambientSound.play();
    soundBtn.textContent = '🔊';
  } else {
    ambientSound.pause();
    soundBtn.textContent = '🔈';
  }
});
