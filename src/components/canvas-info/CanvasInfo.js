import { WINDOW_SIZE } from '../../const/const';
import './canvasInfo.css';

export default class CanvasInfo {
  constructor(canvas) {
    this.currentCanvas = canvas.getCanvas();

    this.canvasInfo = document.createElement('div');
    this.canvasInfo.className = 'canvas-info';

    this.canvasSize = document.createElement('span');
    this.canvasSize.className = 'canvas-info__canvas-size';

    this.canvasCoordinates = document.createElement('span');
    this.canvasCoordinates.className = 'canvas-info__canvas-coordinates';

    this.canvasInfo.appendChild(this.canvasSize);
    this.canvasInfo.appendChild(this.canvasCoordinates);

    document.querySelector('.animation-column').appendChild(this.canvasInfo);
  }
  set() {

    this.canvasSize.innerHTML = `[${this.currentCanvas.getAttribute('width')} : ${this.currentCanvas.getAttribute('height')}]`;


    this.currentCanvas.addEventListener('mousemove', () => {
      this.canvasCoordinates.classList.add('enabled');
      let x = Math.floor((this.currentCanvas.getAttribute('width') * event.offsetX) / WINDOW_SIZE);
      let y = Math.floor((this.currentCanvas.getAttribute('height') * event.offsetY) / WINDOW_SIZE);
      this.canvasCoordinates.innerHTML = `${x} : ${y}`;
    });

    this.currentCanvas.addEventListener('mouseleave', () => {
      this.canvasCoordinates.classList.remove('enabled');
    });

    this.currentCanvas.addEventListener('resize', () => {
      this.canvasSize.innerHTML = `[${this.currentCanvas.getAttribute('width')} x ${this.currentCanvas.getAttribute('height')}]`;
    });

  }
}
