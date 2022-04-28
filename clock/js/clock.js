const hourDom = document.querySelector('#hours');
const minDom = document.querySelector('#minutes');
const secDom = document.querySelector('#seconds');

class Clock {
  constructor() {}
  getTime() {
    const date = new Date();

    const hour = date.getHours().toString().padStart(2,'0');
    const min = date.getMinutes().toString().padStart(2,'0');
    const sec = date.getSeconds().toString().padStart(2,'0');

    return { hour, min, sec }
  }
}

window.onload = () => {
  const clock = new Clock();

  setInterval(() => {
    const { hour, min, sec } = clock.getTime();

    hourDom.innerText = hour;
    minDom.innerText = min;
    secDom.innerText = sec;
  }, 500);
}


// function getCurrentTime() {
//   const time = new Date();

//   hour.innerText = time.getHours().toString().padStart(2,'0');
//   min.innerText = time.getMinutes().toString().padStart(2,'0');
//   sec.innerText = time.getSeconds().toString().padStart(2,'0');

// }

// function updateTime() {
//   getCurrentTime();
//   setTimeout(updateTime, 1000);
// }

// window.onload = function() {
//   updateTime();
// }
