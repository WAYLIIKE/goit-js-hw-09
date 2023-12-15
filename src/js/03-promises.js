import { Notify } from 'notiflix/build/notiflix-notify-aio';

const selectors = {
  form: document.querySelector('.form'),
  btn: document.querySelector('button'),
};

selectors.form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  for (let i = 0; i < event.currentTarget.amount.value; i++) {
    let position = i + 1;

    let passedStep =
      Number(event.currentTarget.delay.value) +
      Number(event.currentTarget.step.value) * i;

    createPromise(position, passedStep)
      .then(value => {
        Notify.success(value);
      })
      .catch(value => {
        Notify.failure(value);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
