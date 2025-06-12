// Smooth multi-gradient fade: day blue → dusk purple → night black
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  let scrollRatio = scrollTop / maxScroll;

  if (scrollRatio > 1) scrollRatio = 1;
  if (scrollRatio < 0) scrollRatio = 0;

  // Define gradient stops
  // 0.0 - light blue
  // 0.5 - purple dusk
  // 1.0 - black night
  let r, g, b;

  if (scrollRatio <= 0.5) {
    // interpolate from light blue (#a1c4fd) to purple (#6a11cb)
    const t = scrollRatio / 0.5;
    r = lerp(161, 106, t);
    g = lerp(196, 17, t);
    b = lerp(253, 203, t);
  } else {
    // interpolate from purple (#6a11cb) to black (#000000)
    const t = (scrollRatio - 0.5) / 0.5;
    r = lerp(106, 0, t);
    g = lerp(17, 0, t);
    b = lerp(203, 0, t);
  }

  document.body.style.background = `rgb(${r},${g},${b})`;

  // Optional: parallax effect on intro text
  const intro = document.querySelector('.intro');
  if(intro){
    intro.style.transform = `translateY(${scrollRatio * -50}px)`;
  }
});

// Linear interpolation helper
function lerp(a, b, t){
  return Math.round(a + (b - a) * t);
}
