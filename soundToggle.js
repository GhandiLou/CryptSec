// Ambient sound toggle with fade in/out

document.addEventListener('DOMContentLoaded', () => {
  const ambientSound = document.getElementById('ambientSound');
  ambientSound.volume = 0;

  let isPlaying = false;

  // Expose function to toggle from custom panel
  window.toggleAmbientSound = function(toggleOn) {
    if (toggleOn) {
      if (!isPlaying) {
        ambientSound.play().catch(() => {}); // play or catch autoplay errors
        fadeInVolume(ambientSound, 0.3, 3000);
        isPlaying = true;
      }
    } else {
      if (isPlaying) {
        fadeOutVolume(ambientSound, 0, 3000).then(() => {
          ambientSound.pause();
          isPlaying = false;
        });
      }
    }
  };

  // Helper fade functions
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

  // Auto-start ambient sound if toggle checked on page load
  const ambientSoundCheckbox = document.getElementById('ambientSoundToggle');
  if (ambientSoundCheckbox && ambientSoundCheckbox.checked) {
    window.toggleAmbientSound(true);
  }
});
