const refs = {
  formEl: document.querySelector('form'),
  inputDelayEl: document.querySelector('input[name="delay"]'),
  inputStepEl: document.querySelector('input[name="step"]'),
  inputAmountEl: document.querySelector('input[name="amount"]'),
  outputPromises: document.querySelector('.js-promises'),
  submitBTn: document.querySelector('button[type="submit"]'),
};
let timerId = null;
let promiseCounter = 0;

refs.formEl.addEventListener('submit', (e) => {
  e.preventDefault();

  const step = refs.inputStepEl.value;
  countPromises(+step);
});

function countPromises(step) {
  const amount = refs.inputAmountEl.value;
  const delay = refs.inputDelayEl.value;
  let time = +delay;
  timerId = setInterval(() => {
    if (promiseCounter == amount) {
      clearInterval(timerId);
      return;
    }
    time += step;
    createPromise(promiseCounter + 1, time);
  }, step);
}

function createPromise(position, delay) {
  // return new Promise((resolve, reject) => {
  setTimeout(() => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      return refs.outputPromises.insertAdjacentHTML(
        'beforeend',
        `<p>✅ Fulfilled promise ${position} in ${delay}ms</p>`
      );
    } else {
      return refs.outputPromises.insertAdjacentHTML(
        'beforeend',
        `<p>❌ Rejected promise ${position} in ${delay}ms</p>`
      );
    }
  }, delay),
    promiseCounter++;
}
