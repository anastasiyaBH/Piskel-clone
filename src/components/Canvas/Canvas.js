const DEFAULT_SIZE = 32;

export default class Canvas {
  constructor () {
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('width', DEFAULT_SIZE);
    this.canvas.setAttribute('height', DEFAULT_SIZE);
    this.canvas.className = 'canvas-area__canvas';
    this.canvas.classList.add('canvas');

    document.querySelector('.canvas-area').appendChild(this.canvas);

    this.size = DEFAULT_SIZE;

    this.canvas.addEventListener ('mouseup', () => {
      this.canvas.dispatchEvent(new Event('canvas'));
    });
  }

  clear() {
    const x = 0, y = 0;
    var ctx = this.canvas.getContext('2d');
    ctx.clearRect(x, y, DEFAULT_SIZE, DEFAULT_SIZE);
  }

  getCanvas() {
    return this.canvas;
  }

  getSize() {
    return this.size;
  }

  setCanvasImage(icon) {
    let ctx = this.canvas.getContext('2d');
    ctx.clearRect(0,0,this.canvas.getAttribute("width"),this.canvas.getAttribute("width"));
    ctx.drawImage(icon, 0, 0);
  }
}
