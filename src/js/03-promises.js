import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const fieldset = document.querySelector('.fieldset');
const delay = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');
const submitButton = document.querySelector('[type="submit"]');

form.addEventListener('submit', e => e.preventDefault());

submitButton.addEventListener('click', () => {
  if (!(delay.value >= 0 && step.value >= 0 && amount.value > 0)) {
    return;
  }

  fieldset.setAttribute('disabled', true);

  let position = 1;

  const interval = setTimeout(function f() {
    if (position <= amount.value) {
      createPromise(position, +delay.value + step.value * (position - 1))
        .then(({ position, delay }) => {
          Notify.success(`Fulfilled promise ${position} in ${delay}ms`, {
            clickToClose: true,
            pauseOnHover: false,
          });
        })
        .catch(({ position, delay }) => {
          Notify.failure(`Rejected promise ${position} in ${delay}ms`, {
            clickToClose: true,
            pauseOnHover: false,
          });
        });
      position += 1;
      setTimeout(f, step.value);
    }

    if (position > amount.value) {
      clearInterval(interval);
      form.reset();
      fieldset.removeAttribute('disabled');
    }
  }, delay.value);
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}
