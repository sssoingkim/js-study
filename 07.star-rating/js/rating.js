const EMPTY_STAR_CLASS = 'fa-star-o';
const FULL_STAR_CLASS = 'fa-star';

class Star {
  constructor(el, count, callback) {
    this._container = document.querySelector(el);
    this._count = count;
    this._getStar = callback;
    this._init = this.createStar();
  }
  destroy() {
    this.addEvent.buttons.forEach((element, index) => {
      //이벤트 이렇게 소거하는게 맞나..?ㅠㅠ
      element.removeEventListener('mouseover', this.changeWhenOver(this.addEvent.buttons, this.addEvent.tempIndex, index));
      element.removeEventListener('click', this._getStar(index+1));
    });
  }
  createStar() {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('button_rating');

    const icon = document.createElement('i');
    icon.classList.add('fa');
    icon.classList.add(EMPTY_STAR_CLASS);
    button.appendChild(icon);
    
    for(let i = 0; i < this._count; i++) {
      this._container.appendChild(button.cloneNode(true));
    }
    this.addEvent();
  }
  addEvent() {
    const buttons = this._container.querySelectorAll('.button_rating');
    let tempIndex = 0;
    let value = 0;

    buttons.forEach((element, index) => {
      element.onmouseover = () => {
        tempIndex = this.changeWhenOver(buttons, tempIndex, index);
      }
      element.onclick = () => {
        value = index;
        this._getStar(index+1);
      }
    });

    this._container.onmouseleave = () => {
      this.changeWhenLeave(buttons, tempIndex, value);
    }
  }
  changeWhenOver(array, temp, idx) {
    if(temp <= idx) {
      for(let i = 0; i < idx+1; i++) {
        array[i].firstChild.classList.replace(EMPTY_STAR_CLASS, FULL_STAR_CLASS);
      }
    } else {
      for(let i = idx+1; i < this._count; i++) {
        array[i].firstChild.classList.replace(FULL_STAR_CLASS, EMPTY_STAR_CLASS);
      }
    }
    temp = idx;

    return temp;
  }
  changeWhenLeave(array, temp, val) {
    if(temp <= val) {
      for(let i = temp+1; i <= val; i++) {
        array[i].firstChild.classList.replace(EMPTY_STAR_CLASS, FULL_STAR_CLASS);
      }
    } else {
      for(let i = temp; i > val; i--) {
        array[i].firstChild.classList.replace(FULL_STAR_CLASS, EMPTY_STAR_CLASS);
      }
    }
  }
}

function getStar(value) {
  document.getElementById('display-star').innerHTML = value;
}

new Star('#star', 5, getStar);