const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

const colorChanger = {
  interval: null,
  currentColor: null,

  start() {
    this.change();
    this.interval = setInterval(this.change, 1000);
  },

  stop() {
    clearInterval(this.interval);
  },

  change() {
    do {
      document.body.style.backgroundColor = getRandomHexColor();
    } while (this.currentColor === document.body.style.backgroundColor);

    this.currentColor = document.body.style.backgroundColor;
    console.log(
      `%c ${document.body.style.backgroundColor}`,
      `color: ${document.body.style.backgroundColor}`
    );
  },
};

startButton.addEventListener('click', e => {
  e.target.disabled = true;
  colorChanger.start();
});

stopButton.addEventListener('click', () => {
  startButton.disabled = false;
  colorChanger.stop();
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
