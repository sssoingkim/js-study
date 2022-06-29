const EMPTY_STAR_CLASS = 'fa-star-o';
const FULL_STAR_CLASS = 'fa-star';

class Star {
  constructor(el, count, callback) {
    this._container = document.querySelector(el);
    this._count = count;
    this._callback = callback;
    this._buttons = [];
    this._active = -1;
    this.init();
  }
  init() {
    const fragment = document.createDocumentFragment();
    for(let i = 1; i <= this._count; i++) {
      const button = document.createElement('button');
      button.setAttribute('type', 'button');
      button.classList.add('button_rating');
      button.dataset.ratingVal = i;

      const icon = document.createElement('i');
      icon.classList.add('fa');
      icon.classList.add(EMPTY_STAR_CLASS);
      button.appendChild(icon);
      fragment.appendChild(button);
    }

    this._container.appendChild(fragment);
    this._buttons = document.querySelectorAll('.button_rating');
    this.bindEvents();
  }
  destroy() {
    this._buttons.forEach((element) => {
      element.removeEventListener('mouseover', this.onMouseOver.bind(this));
      element.removeEventListener('click', this.onMouseClick.bind(this));
    });
    this._container.removeEventListener('mouseleave', this.onMouseLeave.bind(this));

    document.getElementById('display-star').innerHTML = '';
    for(let i = 0; i < this._count; i++) {
      this._container.removeChild(this._buttons[i]);
    }
  }
  fillColor(val) {
    for(let i = 0; i < this._count; i++) {
      if(i < val) {
        this._buttons[i].children[0].classList.add(FULL_STAR_CLASS);
      } else {
        this._buttons[i].children[0].classList.remove(FULL_STAR_CLASS);
      }
    }
  }
  onMouseOver(e) {
    const ratingVal = e.currentTarget.dataset.ratingVal;
    if(!ratingVal) return;
    this.fillColor(ratingVal);
  }
  onMouseLeave() {
    this.fillColor(this._active);
  }
  onMouseClick(e) {
    this._active = e.currentTarget.dataset.ratingVal;
    this.fillColor(this._active);
    this._callback(this._active);
  }
  bindEvents() {
    this._buttons.forEach((element) => {
      element.addEventListener('mouseover', this.onMouseOver.bind(this));
      element.addEventListener('click', this.onMouseClick.bind(this));
    });
    this._container.addEventListener('mouseleave', this.onMouseLeave.bind(this));
  }
}

function getStar(value) {
  document.getElementById('display-star').innerHTML = value;
}

const star = new Star('#star', 5, getStar);