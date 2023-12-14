const startBtn = document.querySelector(`button[data-start]`);
const stopBtn = document.querySelector(`button[data-stop]`);

stopBtn.setAttribute('disabled', '');

const body = document.querySelector('body');

startBtn.addEventListener('click', handleStart);

stopBtn.addEventListener('click', handleStop);

let colorChanger;

function handleStart() {
  colorChanger = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  stopBtn.removeAttribute('disabled');
  startBtn.setAttribute('disabled', '');
}

function handleStop() {
  clearInterval(colorChanger);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', '');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
