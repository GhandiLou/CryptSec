// Smooth background fade from white to black on scroll with eased curve
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  let scrollRatio = scrollTop / maxScroll;

  if (scrollRatio > 1) scrollRatio = 1;
  if (scrollRatio < 0) scrollRatio = 0;

  // Eased curve for smoother fade
  const easedRatio = Math.pow(scrollRatio, 1.5);

  // Calculate gray value from white (255) to black (0)
  const colorVal = Math.floor(255 * (1 - easedRatio));

  document.body.style.backgroundColor = `rgb(${colorVal}, ${colorVal}, ${colorVal})`;

  // Optional: parallax effect on intro text
  const intro = document.querySelector('.intro');
  if(intro){
    intro.style.transform = `translateY(${scrollRatio * -50}px)`;
  }
});
