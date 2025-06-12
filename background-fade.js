// Smooth background fade from white to black on scroll

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  let scrollRatio = scrollTop / maxScroll;

  if (scrollRatio > 1) scrollRatio = 1;
  if (scrollRatio < 0) scrollRatio = 0;

  // Smooth easing for nicer fade
  const easedRatio = Math.pow(scrollRatio, 1.5);

  // Calculate gray level (255 white → 0 black)
  const colorVal = Math.floor(255 * (1 - easedRatio));

  document.body.style.backgroundColor = `rgb(${colorVal}, ${colorVal}, ${colorVal})`;
});
