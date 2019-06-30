import { WINDOW_SIZE } from '../../const/const'

export default class Move {
  constructor(canvas) {
    this.currentCanvas = canvas.getCanvas();

    this.move = document.createElement('li');
    this.move.className = 'tool-wrapper__tool';
    this.move.classList.add('move');

    document.querySelector('.tool-wrapper').appendChild(this.move);
  }

  start() {
    this.move.dispatchEvent(new Event('tool', { "bubbles": true }));
    const ctx = this.currentCanvas.getContext('2d');

    this.currentCanvas.onmousedown = () => {
      let startCanvas = ctx.getImageData(0, 0, this.currentCanvas.getAttribute("width"), this.currentCanvas.getAttribute("height"));

      let startX = Math.floor((this.currentCanvas.getAttribute("width") * event.offsetX) / WINDOW_SIZE);
      let startY = Math.floor((this.currentCanvas.getAttribute("height") * event.offsetY) / WINDOW_SIZE);

      this.currentCanvas.onmousemove = (event) => {
        ctx.clearRect(0, 0, this.currentCanvas.getAttribute("width"), this.currentCanvas.getAttribute("height"));

        let currentX = Math.floor((this.currentCanvas.getAttribute("width") * event.offsetX) / WINDOW_SIZE);
        let currentY = Math.floor((this.currentCanvas.getAttribute("height") * event.offsetY) / WINDOW_SIZE);

        ctx.putImageData(startCanvas, currentX - startX, currentY - startY);
      };

      this.currentCanvas.onmouseup = () => {
        this.currentCanvas.onmousemove = null;
        this.currentCanvas.dispatchEvent(new Event('canvas'));
      };
    };
  }

  set() {
    this.move.onclick = () => {
      this.start();
    };
  }
}
