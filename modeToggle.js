const modeBtn = document.getElementById('modeToggle');

function toggleMode() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('darkMode', isDark ? 'true' : 'false');
}

modeBtn.addEventListener('click', toggleMode);

// Load saved mode
window.addEventListener('load', () => {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
  }
});
