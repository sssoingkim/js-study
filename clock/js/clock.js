const hour = document.querySelector('#hours');
const min = document.querySelector('#minutes');
const sec = document.querySelector('#seconds');

class Clock {
  constructor() {}
  getTime() {
    const date = new Date();

    const _hour = date.getHours().toString().padStart(2,'0');
    const _min = date.getMinutes().toString().padStart(2,'0');
    const _sec = date.getSeconds().toString().padStart(2,'0');

    return { _hour, _min, _sec}
  }
}

window.onload = () => {
  const clock = new Clock();

  setInterval(() => {
    const time = clock.getTime();

    hour.innerText = time._hour;
    min.innerText = time._min;
    sec.innerText = time._sec;
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
