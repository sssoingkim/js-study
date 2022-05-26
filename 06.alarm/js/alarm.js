class Alarm {
  constructor(id) {
    this._container = document.querySelector(id).innerHTML = `
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
          <button type="button" class="button_submit">등록</button>
        </div>
      </div>
    `;
    this._clock = document.querySelector('#clock');
    this._buttonNow = document.querySelector('#now');
    this._buttonRegister = document.querySelector('#register');
    this._modalRequest = document.querySelector('#request-modal');
    this._buttonSubmit = document.querySelector('.button_submit');
    this._alarmList = document.querySelector('#alarm-list');
    this._currentHour = 0;
    this._currentMin = 0;
    this._currentSec = 0;
    this._inputHour = 0;
    this._inputMin = 0;
    this._inputSec = 0;
    this._clockInterval = null;
    this._compareInterval = null;
  }

  init() {
    this.updateTime();
    this._buttonRegister.addEventListener('click', this.openRequestModal.bind(this));
    this._buttonNow.addEventListener('click', this.updateTime.bind(this));
  }
  getTimeNow() {
    const nowDate = new Date();

    this._currentHour = nowDate.getHours();
    this._currentMin = nowDate.getMinutes();
    this._currentSec = nowDate.getSeconds();

    this.updateBoard(this._currentHour, this._currentMin, this._currentSec);
  }
  updateTime() {
    this._clockInterval = setInterval(() => {
      this.getTimeNow();
    }, 500);
  }
  openRequestModal() {
    this._modalRequest.style.display = 'block';
    this._buttonSubmit.addEventListener('click', this.registerAlarm.bind(this));
  }
  registerAlarm() {
    this._inputHour = this.checkError('hour', document.querySelector('#hour').value);
    this._inputMin = this.checkError('min', document.querySelector('#min').value);
    this._inputSec = this.checkError('sec', document.querySelector('#sec').value);

    if(!this.checkPast(this._inputHour, this._inputMin, this._inputSec)) {
      alert("지난 시간입니다. 다시 입력하세요.");
    } else {
      document.querySelector('#hour').value = '';
      document.querySelector('#min').value = '';
      document.querySelector('#sec').value = '';
  
      this.updateBoard(this._inputHour, this._inputMin, this._inputSec);
      this.setAlarmList(this._inputHour, this._inputMin, this._inputSec);
      
      clearInterval(this._clockInterval);
      this._buttonSubmit.removeEventListener('click', this.registerAlarm.bind(this));
      this._modalRequest.style.display = 'none';
    }
  }
  formatingTime(number) {
    return number.toString().padStart(2,'0');
  }
  updateBoard(hour, min, sec) {
    this._clock.innerHTML = `${this.formatingTime(hour)} : ${this.formatingTime(min)} : ${this.formatingTime(sec)}`;
  }
  setAlarmList(hour, min, sec) {
    const li = document.createElement('li');
    li.setAttribute('class', 'list_item');
    
    const span = document.createElement('span');
    span.setAttribute('class', 'time');
    span.innerHTML = `${this.formatingTime(hour)} : ${this.formatingTime(min)} : ${this.formatingTime(sec)}`
    li.appendChild(span);

    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'button_remove');
    button.innerHTML = '삭제';
    button.addEventListener('click', function() {
      this._inputHour = null;
      this._inputMin = null;
      this._inputSec = null;
      this.parentNode.remove();
      console.log('Remove&inputed ' + this._inputHour, this._inputMin, this._inputSec);
    });
    li.appendChild(button);

    this._alarmList.appendChild(li);
  }
  compareTime() {
    //compareTime 메소드를 호출한 적이 없는데 왜 작동하지..?ㅎㅎ
    this._compareInterval = setInterval(() => {
      console.log('Interval&inputed ' + this._inputHour, this._inputMin, this._inputSec);
      // 알람 삭제했을때 button에 넣어준 삭제 함수에서 null 값을 넣었는데 console.log에 여전히 값이 찍혀나옴. this._inputHour, ... 이 값들은 어떻게 업데이트 시켜주지? 
      if(this._currentHour == this._inputHour && this._currentMin == this._inputMin && this._currentSec == this._inputSec) {
        this.alertAlarm();
        li.remove();
      }
    }, 500);
  }
  alertAlarm() {
    alert("RING⏰ RING⏰ RING⏰");
    clearInterval(this._compareInterval);
  }
  checkPast(hour, min, sec) {
    if(this._currentHour < hour) return true;
    else if(this._currentHour == hour) {
      if(this._currentMin < min) return true;
      else if(this._currentMin == min) {
        if(this._currentSec < sec) return true;
        else return false;
      } else return false;
    } else return false;
  }
  checkError(type, param) {
    if(type === 'hour') {
      if(param > 23) return param = 23;
      else if(param === null || isNaN(param)) return param = 0;
      else return Number(param);
    } else {
      if(param > 59) return param = 59;
      else if(param === null || isNaN(param)) return param = 0;
      else return Number(param);
    } 
  }
}

window.onload = () => {
  const alarm = new Alarm('#alarm-wrap');
  alarm.init();
}


/* 안되는 부분
1. 알람을 여러개 등록할 경우 '지난시간'이라고 알림뜸 -> 알람이 제거되어도 동일.
2. 알람리스트에서 알람을 제거해도 알람이 울림.


해야할 부분
1. 배열로 알람 여러개 받기
2. 배열 sorting
*/