class PixelArt {
  constructor(el, rows, cols) {
    this._container = document.querySelector(el);
    this._rows = rows;
    this._cols = cols;
    this._canvas = document.createElement('div');
    this._palette = document.createElement('div');
    this._picked = '';
    this.init();
    this.bindEvents();
  }
  init() {
    this._canvas.id = 'canvas';
    this._canvas.style.gridTemplateColumns = `repeat(${this._cols}, 1fr)`;
    for(let i = 0; i < this._rows * this._cols; i++) {
      const span = document.createElement('span');
      span.classList.add('grid_item');
      this._canvas.appendChild(span);
    }
    this._container.appendChild(this._canvas);

    this._palette.id = 'palette';
    this._palette.style.gridTemplateColumns = `repeat(${this._cols}, 1fr)`;
    for(let i = 0; i < this._cols; i++) {
      const span = document.createElement('span');
      span.classList.add('grid_item', 'palette');
      const colorHex = `#${Math.round(Math.random() * 0xffffff).toString(16)}`;
      span.style.backgroundColor = colorHex;
      span.dataset.colorCode = colorHex;
      this._palette.appendChild(span);
    }
    this._container.appendChild(this._palette);
  }
  pick(e) {
    this._picked = e.target.dataset.colorCode;
    console.log(this._picked);
  }
  paint(e) {
    e.target.style.backgroundColor = this._picked;
  }
  bindEvents() {
    this._palette.addEventListener('click', this.pick.bind(this));
    this._canvas.addEventListener('click', this.paint.bind(this));
  }
}

new PixelArt('#grid', 5, 6);