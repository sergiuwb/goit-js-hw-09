import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');

const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

function pad(value) {
  return String(value).padStart(2, '0');
}

const timer = {
  timestamp: null,
  interval: null,

  ready(stamp) {
    this.timestamp = stamp;
    startButton.addEventListener('click', timer.start);
  },

  start() {
    startButton.disabled = true;
    timer.interval = setInterval(() => {
      let diff = timer.timestamp - Date.now();

      if (diff < 1000) {
        timer.stop();
        Notify.failure('Time is up');
      }

      timerDays.textContent = pad(Math.floor(diff / 86400000));
      timerHours.textContent = pad(Math.floor((diff % 86400000) / 3600000));
      timerMinutes.textContent = pad(
        Math.floor(((diff % 86400000) % 3600000) / 60000)
      );
      timerSeconds.textContent = pad(Math.floor((diff % 60000) / 1000));
    }, 1000);
  },

  stop() {
    clearInterval(timer.interval);
    startButton.removeEventListener('click', timer.start);
  },
};

flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      startButton.disabled = false;

      timer.stop();
      timer.ready(selectedDates[0]);
      return;
    }

    startButton.disabled = true;
    Notify.failure('Please choose a date in the future');
  },
});
