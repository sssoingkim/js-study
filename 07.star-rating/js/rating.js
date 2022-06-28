const EMPTY_STAR_CLASS = 'fa-star-o';
const FULL_STAR_CLASS = 'fa-star';

class Star {
  constructor(el, count, callback) {
    this._container = document.querySelector(el);
    this._count = count;
    this._getStar = callback; //멤버변수 이름도 _callback으로 써주는게 더 안헷갈리고 좋을까?
    this._active = -1;
    this.init();
    this.bindEvents(); //왜 여기서 bindEvents?
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
      icon.dataset.ratingVal = i;
      button.appendChild(icon);
      fragment.appendChild(button);
    }

    this._container.appendChild(fragment);
  }
  destroy() {
    this._container.removeEventListener('mouseover', this.onMouseOver.bind(this));
    this._container.removeEventListener('mouseleave', this.onMouseLeave.bind(this));
    this._container.removeEventListener('click', this.onMouseClick.bind(this));
  }
  fillColor(val) {
    for(let i = 0; i < this._count; i++) {
      if(i < val) {
        this._container.children[i].children[0].classList.add(FULL_STAR_CLASS);
      } else {
        this._container.children[i].children[0].classList.remove(FULL_STAR_CLASS);
      }
    }
  }
  onMouseOver(e) {
    const ratingVal = e.target.dataset.ratingVal; //button을 가리키게 하는 좋은 방법은?
    if(!ratingVal) return;
    this.fillColor(ratingVal);
  }
  onMouseLeave() {//e 매개변수는 왜 넣어주지? 쓰임이 없는디.. 지워도 괜찮은가?
    this.fillColor(this._active);
  }
  onMouseClick(e) {
    this._active = e.target.dataset.ratingVal;
    this.fillColor(this._active);
    this._getStar(this._active);
  }
  bindEvents() {
    this._container.addEventListener('mouseover', this.onMouseOver.bind(this));
    this._container.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    this._container.addEventListener('click', this.onMouseClick.bind(this));
  }
}

function getStar(value) {
  document.getElementById('display-star').innerHTML = value;
}

new Star('#star', 5, getStar);