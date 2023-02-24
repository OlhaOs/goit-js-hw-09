import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

require('flatpickr/dist/themes/dark.css');

const refs = {
  datePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
  timerEl: document.querySelector('.timer'),
};
refs.startBtn.disabled = true;
let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    return selectedDate;
  },

  onChange(selectedDates, dateStr) {
    isDatePickedInFuture(selectedDates, dateStr);
  },
};

flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', onStartTbnClick);

function isDatePickedInFuture(dates, dateStr) {
  const deltaTime = dates[0].getTime() - Date.now();
  if (deltaTime < 0) {
    alert('You picked the date in the past ' + dateStr);
  } else {
    refs.startBtn.disabled = false;
  }
}

function onStartTbnClick() {
  const deltaTime = selectedDate - Date.now();
  getTimerStarted(deltaTime);
}

function getTimerStarted(ms) {
  const interval = 1000;
  let timer = ms;
  const timerId = setInterval(() => {
    if (timer - interval >= 0) {
      timer -= interval;
      getInterface(convertMs(timer));
    } else {
      refs.timerEl.insertAdjacentHTML(
        'beforeend',
        '<div class="timerStop">TIME IS UP!</div>'
      );
      console.log(refs.timerEl);
      clearInterval(timerId);
    }
  }, interval);
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

function getInterface({ days, hours, minutes, seconds }) {
  return (
    (refs.daysEl.textContent = `${addLeadingZero(days)}`),
    (refs.hoursEl.textContent = `${addLeadingZero(hours)}`),
    (refs.minutesEl.textContent = `${addLeadingZero(minutes)}`),
    (refs.secondsEl.textContent = `${addLeadingZero(seconds)}`)
  );
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
