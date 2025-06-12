(() => {
  const consoleOverlay = document.getElementById('consoleOverlay');
  const consoleOutput = document.getElementById('consoleOutput');
  const consoleInput = document.getElementById('consoleInput');

  let matrixActive = false;

  const commands = {
    help() {
      return `Available commands:
help - Show this help
matrix on/off - Toggle matrix rain
clear -
