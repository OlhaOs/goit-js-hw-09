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
    createPromise(promiseCounter + 1, time)
      .then((x) => console.log(x))
      .catch((y) => console.log(y));
  }, step);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    promiseCounter++;
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        refs.outputPromises.insertAdjacentHTML(
          'beforeend',
          `<p>✅ Fulfilled promise ${position} in ${delay}ms</p>`
        );
        return resolve({ position, delay });
      } else {
        refs.outputPromises.insertAdjacentHTML(
          'beforeend',
          `<p>❌ Rejected promise ${position} in ${delay}ms</p>`
        );
        return reject({ position, delay });
      }
    }, delay);
  });
}

//////------------Це код із конспекта GoIT

// // Change value of isSuccess variable to call resolve or reject
// const isSuccess = false;

// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     if (isSuccess) {
//       resolve("Success! Value passed to resolve function");
//     } else {
//       reject("Error! Error passed to reject function");
//     }
//   }, 2000);s
// });

// // Will run first
// console.log("Before promise.then()");

// // Registering promise callbacks
// promise.then(
//   // onResolve will run third or not at all
//   value => {
//     console.log("onResolve call inside promise.then()");
//     console.log(value); // "Success! Value passed to resolve function"
//   },
//   // onReject will run third or not at all
//   error => {
//     console.log("onReject call inside promise.then()");
//     console.log(error); // "Error! Error passed to reject function"
//   }
// );

// // Will run second
// console.log("After promise.then()");
