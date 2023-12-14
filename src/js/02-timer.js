import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector(`input[id="datetime-picker"]`);
const btn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
btn.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const chooseDate = new Date(selectedDates[0]);
    const nowDate = new Date();
    nowDate.setSeconds(0, 0);

    if (nowDate.getTime() >= chooseDate.getTime()) {
      Notify.warning('Please choose a date in the future');
      btn.setAttribute('disabled', '');
    } else {
      btn.removeAttribute('disabled');
    }
  },
};

flatpickr(input, options);

btn.addEventListener('click', handleStart);

function handleStart() {
  const chooseDate = new Date(input.value);
  let nowDate = new Date();
  const getTimerUpdate = setInterval(() => {
    nowDate = new Date();
    nowDate.setMilliseconds(0);
    const timerTime = convertMs(chooseDate.getTime() - nowDate.getTime());
    days.textContent = addLeadingZero(timerTime.days.toString());
    minutes.textContent = addLeadingZero(timerTime.minutes.toString());
    hours.textContent = addLeadingZero(timerTime.hours.toString());
    seconds.textContent = addLeadingZero(timerTime.seconds.toString());
    if (chooseDate.getTime() === nowDate.getTime()) {
      Notify.success('Timer down! Refresh page to start new');
      clearInterval(getTimerUpdate);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  if (value >= 0 && value < 10) {
    return value.padStart(2, '0');
  } else return value;
}
