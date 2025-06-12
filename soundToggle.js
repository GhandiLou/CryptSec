const soundBtn = document.getElementById('soundToggle');
const ambientSound = document.getElementById('ambientSound');

function setSoundIcon(isPlaying) {
  soundBtn.textContent = isPlaying ? '🔊' : '🔈';
}

function toggleSound() {
  if (ambientSound.paused) {
    ambientSound.volume = 0;
    ambientSound.play();
    fadeInVolume(ambientSound, 0.3, 3000);
    setSoundIcon(true);
  } else {
    fadeOutVolume(ambientSound, 0, 3000).then(() => {
      ambientSound.pause();
      setSoundIcon(false);
    });
  }
}

function fadeInVolume(audio, target, duration) {
  return new Promise((resolve) => {
    const step = (target - audio.volume) / (duration / 50);
    let vol = audio.volume;
    const interval = setInterval(() => {
      vol += step;
      if (vol >= target) {
        audio.volume = target;
        clearInterval(interval);
        resolve();
      } else {
        audio.volume = vol;
      }
    }, 50);
  });
}

function fadeOutVolume(audio, target, duration) {
  return new Promise((resolve) => {
    const step = (audio.volume - target) / (duration / 50);
    let vol = audio.volume;
    const interval = setInterval(() => {
      vol -= step;
      if (vol <= target) {
        audio.volume = target;
        clearInterval(interval);
        resolve();
      } else {
        audio.volume = vol;
      }
    }, 50);
  });
}

soundBtn.addEventListener('click', toggleSound);
