const INTERVAL_MS = 500;

class Alarm {
  constructor(id) {
    this._container = document.querySelector(id);
    this._container.innerHTML = `
      <button type="button" id="register" class="button_register">⏰ 알람 등록</button>
      <div class="clock_area">
        <span id="clock" class="clock_board"></span>
        <button type="button" id="now" class="button_now">🔄<br>현재시간</button>
      </div>
      <div class="registered_area">
        <ul id="alarm-list" class="alarm_list"></ul>
      </div>

      <div id="request-modal" class="modal" style="display: none">
        <div class="modal_content">
          <strong class="modal_title">알람 등록</strong>
          <span class="units">
            <input type="text" id="hour" class="input_time"><label for="hour" class="label_unit">시</label>
          </span>
          <span class="units">
            <input type="text" id="min" class="input_time"><label for="min" class="label_unit">분</label>
          </span>
          <span class="units">
            <input type="text" id="sec" class="input_time"><label for="sec" class="label_unit">초</label>
          </span>
          <div class="button_wrap">
            <button type="button" class="button_submit">등록</button>
            <button type="button" class="button_close">닫기</button>
          </div>
        </div>
      </div>
    `;
    this._clock = document.querySelector('#clock');
    this._buttonNow = document.querySelector('#now');
    this._buttonRegister = document.querySelector('#register');
    this._modalRequest = document.querySelector('#request-modal');
    this._buttonSubmit = document.querySelector('.button_submit');
    this._buttonClose = document.querySelector('.button_close');
    this._alarmList = document.querySelector('#alarm-list');
    this._currentTime = {
      'hour': 0,
      'min': 0,
      'sec': 0
    }
    this._inputTime = {
      'hour': 0,
      'min': 0,
      'sec': 0
    }
    this._registerList = [];
    this._clockInterval = null;
    this._compareInterval = null;
  }

  init() {
    this.updateTime();
    this._buttonRegister.addEventListener('click', this.openRequestModal.bind(this));
    this._buttonNow.addEventListener('click', this.updateTime.bind(this));
    this._buttonSubmit.addEventListener('click', this.registerAlarm.bind(this));
    this._buttonClose.addEventListener('click', this.closeRequestModal.bind(this));
  }
  destroy() {
    this._buttonRegister.removeEventListener('click', this.openRequestModal.bind(this));
    this._buttonNow.removeEventListener('click', this.updateTime.bind(this));
    this._buttonSubmit.removeEventListener('click', this.registerAlarm.bind(this));
    this._buttonClose.removeEventListener('click', this.closeRequestModal.bind(this));
  }
  getTimeNow() {
    const nowDate = new Date();

    this._currentTime.hour = nowDate.getHours();
    this._currentTime.min = nowDate.getMinutes();
    this._currentTime.sec = nowDate.getSeconds();

    this.updateBoard(this._currentTime);
  }
  formatTime(number) {
    return number.toString().padStart(2,'0');
  }
  updateTime() {
    this._clockInterval = setInterval(() => {
      this.getTimeNow();
    }, INTERVAL_MS);
  }
  updateBoard(obj) {
    this._clock.innerHTML = `${this.formatTime(obj.hour)} : ${this.formatTime(obj.min)} : ${this.formatTime(obj.sec)}`;
  }
  openRequestModal() {
    this._modalRequest.style.display = 'block';
  }
  closeRequestModal() {
    this._modalRequest.style.display = 'none';
  }
  // 두번째 알람 등록 시, registerAlarm이 두 번 호출되고, 두번째엔 빈값이 들어간다!
  registerAlarm() {
    const hourDom = document.querySelector('#hour');
    const minDom = document.querySelector('#min');
    const secDom = document.querySelector('#sec');

    let hourValue = hourDom.value;
    let minValue = minDom.value;
    let secValue = secDom.value;

    console.log('input value: ', hourValue, minValue, secValue);
    console.log('current value: ', this._currentTime);

    if(!this.isValidTime(hourValue, minValue, secValue)) {
      alert("올바른 시간 값을 입력하세요.")
    } 
    else if(!this.isFuture(this._currentTime.hour, this._currentTime.min, this._currentTime.sec, hourValue, minValue, secValue)) {
      alert("지난 시간입니다. 다시 입력하세요.");
    }
    else {
      this._inputTime.hour = hourValue;
      this._inputTime.min = minValue;
      this._inputTime.sec = secValue;

      const tempTime = {
        hour: hourValue,
        min: minValue,
        sec: secValue
      }

      console.log('input time : ', this._inputTime);

      hourDom.value = '';
      minDom.value = '';
      secDom.value = '';
  
      this.addListArray(tempTime);
      this.updateBoard(this._inputTime);
      this.setAlarmList(this._inputTime);
      
      clearInterval(this._clockInterval);
      this.closeRequestModal();
    }
  }
  addListArray(obj) {
    this._registerList.push(obj);
    this._registerList.sort();
    console.log(this._registerList);
  }
  setAlarmList(obj) {
    const li = document.createElement('li');
    li.setAttribute('class', 'list_item');
    
    const span = document.createElement('span');
    span.setAttribute('class', 'time');
    span.innerHTML = `${this.formatTime(obj.hour)} : ${this.formatTime(obj.min)} : ${this.formatTime(obj.sec)}`
    li.appendChild(span);

    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'button_remove');
    button.innerHTML = '삭제';
    button.addEventListener('click', (e) => {
      this._inputTime.hour = null;
      this._inputTime.min = null;
      this._inputTime.sec = null;

      clearInterval(this._compareInterval);
      e.currentTarget.parentNode.remove();
      //배열에서도 삭제
    });
    li.appendChild(button);

    this._alarmList.appendChild(li);

    this.compareTime(li);
  }
  compareTime(item) {
    this._compareInterval = setInterval(() => {
      if(this._currentTime.hour == this._registerList[0].hour && this._currentTime.min == this._registerList[0].min && this._currentTime.sec == this._registerList[0].sec) {
        this.alertAlarm();
        this._registerList.shift();
        item.remove();
      }
    }, INTERVAL_MS);
  }
  alertAlarm() {
    alert("RING⏰ RING⏰ RING⏰");
    
    //배열에서도 삭제
    clearInterval(this._compareInterval);
  }
  isFuture(baseHour, baseMin, baseSec, hour, min, sec) {
    console.log("is future: ", hour, min, sec);
    if(baseHour < hour) return true;
    else if(baseHour == hour) {
      if(baseMin < min) return true;
      else if(baseMin == min) {
        if(baseSec < sec) return true;
        else return false;
      } else return false;
    } else return false;
  }
  isValidTime(hour, min, sec) {
    if(hour === null || isNaN(hour) || hour < 0 || hour > 23 || min === null || isNaN(min) || min < 0 || min > 59 || sec === null || isNaN(sec) || sec < 0 || sec > 59) return false;
    else return true;
  }
  // checkError(type, param) {
  //   if(type === 'hour') {
  //     if(param > 23) return param = 23;
  //     else if(param === null || isNaN(param)) return param = 0;
  //     else return Number(param);
  //   } else {
  //     if(param > 59) return param = 59;
  //     else if(param === null || isNaN(param)) return param = 0;
  //     else return Number(param);
  //   } 
  // }
}

window.onload = () => {
  const alarm = new Alarm('#alarm-wrap');
  alarm.init();
}

/*
해야할 부분
1. 배열 sorting
2. 배열에서 삭제 하기
*/