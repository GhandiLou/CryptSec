// Changes background color from white to black based on scroll

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;

  // Calculate scroll ratio (0 at top, 1 at bottom)
  let scrollRatio = scrollTop / maxScroll;
  if (scrollRatio > 1) scrollRatio = 1;
  if (scrollRatio < 0) scrollRatio = 0;

  // Calculate grayscale value (255 to 0)
  const colorVal = Math.floor(255 * (1 - scrollRatio));

  // Set background color
  document.body.style.backgroundColor = `rgb(${colorVal}, ${colorVal}, ${colorVal})`;
});
