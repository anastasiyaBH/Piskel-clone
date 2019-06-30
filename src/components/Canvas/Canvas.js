import { DEFAULT_SIZE } from '../../const/const'

export default class Canvas {
  constructor () {
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('width', DEFAULT_SIZE);
    this.canvas.setAttribute('height', DEFAULT_SIZE);
    this.canvas.className = 'canvas-area__canvas';
    this.canvas.classList.add('canvas');

    document.querySelector('.canvas-area').appendChild(this.canvas);

    this.size = DEFAULT_SIZE;

    this.canvas.addEventListener('click', () => {
      localStorage.setItem('canvas', this.canvas.toDataURL());
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

  setCanvasData() {
    let data = localStorage.getItem('canvas');
    if(data != null) {
      var ctx = this.canvas.getContext('2d');
      let img = new Image;
      img.src = data;
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
    }
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
