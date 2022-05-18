class Stopwatch {
  constructor(containerId) {
    this._container = document.querySelector(containerId).innerHTML = `
      <div id="timer"></div>
      <div class="button_wrap">
        <button type="button" id="play" class="button_play">시작</button>
        <button type="button" id="reset" class="button_reset">초기화</button>
      </div>
      <ul id="record-list"></ul>
    `;
    this._timer = document.querySelector('#timer');
    this._buttonPlay = document.querySelector('#play');
    this._buttonReset = document.querySelector('#reset');
    this._recordList = document.querySelector('#record-list');
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
    
    const buttonRemove = document.createElement('button');
    buttonRemove.setAttribute('type', 'button');
    buttonRemove.setAttribute('class', 'button_remove');
    buttonRemove.innerText = '삭제';
    buttonRemove.addEventListener('click', this.removeTime.bind(this));
    list.appendChild(buttonRemove);

    const span = document.createElement('span');
    span.setAttribute('class', 'times');
    span.innerHTML = `${hour} : ${min} : ${sec}`;
    list.appendChild(span);

    this._recordList.appendChild(list);
  }
  removeTime(e) {
    e.currentTarget.parentNode.remove();
  }
  start() {
    this._buttonPlay.classList.add(this._STOP_CLASS);
    this._buttonPlay.innerText = '기록';

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

    this._buttonPlay.classList.remove(this._STOP_CLASS);
    this._buttonPlay.innerText = '시작';
    this._recordList.innerHTML = '';

    this._flag = false;
  }
  play() {
    if(this._flag) this.stop();
    else this.start();

    this._flag = !this._flag;
  }
}

window.onload = () => {
  const stopwatch = new Stopwatch('#wrap');
  stopwatch.init();
}