const soundBtn = document.getElementById('soundToggle');
const ambientSound = document.getElementById('ambientSound');

function setSoundIcon(isPlaying) {
  soundBtn.textContent = isPlaying ? '🔊' : '🔈';
}

function toggleSound() {
  if (ambientSound.paused) {
    ambientSound.volume = 0;
    ambientSound.play();
    fadeVolume(ambientSound, 0, 0.4, 2000);
    setSoundIcon(true);
    localStorage.setItem('soundEnabled', 'true');
  } else {
    fadeVolume(ambientSound, ambientSound.volume, 0, 2000, () => {
      ambientSound.pause();
      setSoundIcon(false);
      localStorage.setItem('soundEnabled', 'false');
    });
  }
}

soundBtn.addEventListener('click', toggleSound);

// Smooth fade function
function fadeVolume(audio, from, to, duration, callback) {
  const stepTime = 50;
  const steps = duration / stepTime;
  let currentStep = 0;
  const volumeStep = (to - from) / steps;
  audio.volume = from;

  const fadeInterval = setInterval(() => {
    currentStep++;
    audio.volume = Math.min(Math.max(audio.volume + volumeStep, 0), 1);
    if (currentStep >= steps) {
      clearInterval(fadeInterval);
      if (callback) callback();
    }
  }, stepTime);
}

// Load saved sound state
window.addEventListener('load', () => {
  if (localStorage.getItem('soundEnabled') === 'true') {
    ambientSound.play();
    setSoundIcon(true);
  } else {
    setSoundIcon(false);
  }
});
