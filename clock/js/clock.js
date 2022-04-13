const hour = document.querySelector('#hours');
const min = document.querySelector('#minutes');
const sec = document.querySelector('#seconds');

function updateTime() {
  const time = new Date();

  hour.innerText = time.getHours().toString().padStart(2,'0');
  min.innerText = time.getMinutes().toString().padStart(2,'0');
  sec.innerText = time.getSeconds().toString().padStart(2,'0');

  setTimeout(updateTime, 1000);
}

window.onload = function() {
  updateTime();
}