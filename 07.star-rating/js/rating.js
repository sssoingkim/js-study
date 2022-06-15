const EMPTY_STAR_CLASS = 'fa-star-o';
const FULL_STAR_CLASS = 'fa-star';

class Star {
  constructor(el, count, callback) {
    this._container = document.querySelector(el);
    this._count = count;
    this._getStar = callback;
  }
  createStar() {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('button_rating');

    const icon = document.createElement('i');
    icon.classList.add('fa');
    icon.classList.add(EMPTY_STAR_CLASS);
    button.appendChild(icon);
    
    for(var i = 0; i < this._count; i++) {
      this._container.appendChild(button.cloneNode(true));
    }
    this.changeColor();
  }
  changeColor() {
    const buttons = this._container.querySelectorAll('.button_rating');
    let tempIndex = 0;
    let value = 0;

    buttons.forEach((element, index) => {
      element.onmouseover = () => {
        if(tempIndex <= index) {
          for(var i = 0; i < index+1; i++) {
            buttons[i].firstChild.classList.replace(EMPTY_STAR_CLASS, FULL_STAR_CLASS);
          }
        } else {
          for(var i = index+1; i < this._count; i++) {
            buttons[i].firstChild.classList.replace(FULL_STAR_CLASS, EMPTY_STAR_CLASS);
          }
        }
        tempIndex = index;
      }
      element.onclick = () => {
        value = index;
        this._getStar(index+1);
      }
    });
    this._container.onmouseleave = () => {
      if(tempIndex <= value) {
        for(var i = tempIndex+1; i <= value; i++) {
          buttons[i].firstChild.classList.replace(EMPTY_STAR_CLASS, FULL_STAR_CLASS);
        }
      } else {
        for(var i = tempIndex; i > value; i--) {
          buttons[i].firstChild.classList.replace(FULL_STAR_CLASS, EMPTY_STAR_CLASS);
        }
      }
    }
  }
}

function getStar(value) {
  document.getElementById('display-star').innerHTML = value;
}

const starRating = new Star('#star', 5, getStar);
starRating.createStar();