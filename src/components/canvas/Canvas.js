import './canvas.css'
import { DEFAULT_SIZE } from '../../const/const'

export default class Canvas {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('width', DEFAULT_SIZE);
    this.canvas.setAttribute('height', DEFAULT_SIZE);
    this.canvas.className = 'canvas-area__canvas';
    this.canvas.classList.add('canvas');

    document.querySelector('.canvas-area').appendChild(this.canvas);

    this.size = DEFAULT_SIZE;

    this.canvas.addEventListener('click', () => {
      let img = this.canvas.toDataURL();
      localStorage.setItem('canvas', img);
      localStorage.setItem('width', this.canvas.getAttribute('width'));
      localStorage.setItem('height', this.canvas.getAttribute('height'));
    });
  }

  getCanvas() {
    return this.canvas;
  }

  setCanvasData() {
    let data = localStorage.getItem('canvas');
    let width = localStorage.getItem('width');
    let height = localStorage.getItem('height');

    if (data != null && width != null && height != null) {
      var ctx = this.canvas.getContext('2d');
      let img = new Image;
      img.src = data;
      this.canvas.setAttribute('width', width);
      this.canvas.setAttribute('height', height);
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
    ctx.clearRect(0, 0, this.canvas.getAttribute("width"), this.canvas.getAttribute("width"));
    ctx.drawImage(icon, 0, 0);
  }
}
