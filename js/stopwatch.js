class Stopwatch {
  constructor(TIMER_ID, PLAY_ID, RESET_ID, LIST_ID) {
    this._timer = document.querySelector(TIMER_ID);
    this._buttonPlay = document.querySelector(PLAY_ID);
    this._buttonReset = document.querySelector(RESET_ID);
    this._recordList = document.querySelector(LIST_ID);
    this._time = 0;
    this._flag = false;
    this._timerInterval = null;
    this._STOP_CLASS = 'stop';
  }
  init() {
    this._buttonPlay.addEventListener('click', this.play.bind(this));
    this._buttonReset.addEventListener('click', this.reset.bind(this));
    
    const { hour, min, sec } = this.updateTime(this._time);
    this.appendTimer(hour, min, sec);
  }
  updateTime(time) {
    let hour, min, sec;

    hour = Math.floor(time/3600).toString().padStart(2, '0');
    min = Math.floor((time%3600)/60).toString().padStart(2, '0');
    sec = Math.floor(time%3600%60).toString().padStart(2, '0');

    return { hour, min, sec }
  }
  appendTimer(hour, min, sec) {
    this._timer.innerHTML = `${hour} : ${min} : ${sec}`;
  }
  recordTime() {
    const { hour, min, sec } = this.updateTime(this._time);
    const list = document.createElement('li');
    list.setAttribute('class', 'list_item');
    list.innerHTML = `${hour} : ${min} : ${sec}`;
    this._recordList.appendChild(list);
  }
  start() {
    this._buttonPlay.classList.add(this._STOP_CLASS);
    this._buttonPlay.innerText = '중지';

    this._timerInterval = setInterval(() => {
      const { hour, min, sec } = this.updateTime(++this._time);
      this.appendTimer(hour, min, sec);
    }, 1000);
  }
  stop() {
    this.recordTime(this._time);
    clearInterval(this._timerInterval);

    this._buttonPlay.classList.remove(this._STOP_CLASS);
    this._buttonPlay.innerText = '시작';
  }
  reset() {
    clearInterval(this._timerInterval);
    this._time = 0;
    const { hour, min, sec } = this.updateTime(this._time);
    this.appendTimer(hour, min, sec);

    this._buttonPlay.innerText = '시작';
    this._recordList.innerHTML = '';
  }
  play() {
    if(this._flag) this.stop();
    else this.start();

    this._flag = !this._flag;
  }
}

window.onload = () => {
  const stopwatch = new Stopwatch('#timer', '#play', '#reset', '#record-list');
  stopwatch.init();
}