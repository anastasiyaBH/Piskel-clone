import { WINDOW_SIZE } from '../../const/const'

export default class Eraser {
  constructor(canvas) {
    this.currentCanvas = canvas.getCanvas();


    this.eraser = document.createElement('li');
    this.eraser.className = 'tool-wrapper__tool';
    this.eraser.classList.add('eraser');

    document.querySelector('.tool-wrapper').appendChild(this.eraser);
  }

  start() {
    this.eraser.dispatchEvent(new Event('tool', { "bubbles": true }));
    const ctx = this.currentCanvas.getContext('2d');
    this.currentCanvas.onmousedown = () => {
      this.currentCanvas.onmousemove = (event) => {
        let x = Math.floor((this.currentCanvas.getAttribute('width') * event.offsetX) / WINDOW_SIZE);
        let y = Math.floor((this.currentCanvas.getAttribute('height') * event.offsetY) / WINDOW_SIZE);
        ctx.clearRect(x, y, 1, 1);
      };

      this.currentCanvas.onmouseup = () => {
        this.currentCanvas.onmousemove = null;
        this.currentCanvas.dispatchEvent(new Event('canvas'));
      };
    };
  }

  set() {
    this.eraser.onclick = () => {
      this.start();
    };
  }
}
