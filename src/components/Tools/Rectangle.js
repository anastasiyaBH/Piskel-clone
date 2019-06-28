import {LEFT_MOUSE_BUTTON, RIGHT_MOUSE_BUTTON, WINDOW_SIZE} from '../../const/const'

export default class Rectangle {
  constructor (canvas) {
    this.currentCanvas = canvas.getCanvas();

    this.rectangle = document.createElement('li');
    this.rectangle.className = 'tool-wrapper__tool';
    this.rectangle.classList.add('rectangle');

    document.querySelector('.tool-wrapper').appendChild(this.rectangle);
  }

  set () {
    this.rectangle.onclick = () => {
      const ctx = this.currentCanvas.getContext('2d');
    this.currentCanvas.onmousedown = () => {

      let startCanvas = ctx.getImageData(0, 0, this.currentCanvas.getAttribute("width"), this.currentCanvas.getAttribute("height"));
      let startX = Math.floor((this.currentCanvas.getAttribute("width") * event.offsetX) / WINDOW_SIZE);
      let startY = Math.floor((this.currentCanvas.getAttribute("height") * event.offsetY) / WINDOW_SIZE);
      let currentX = 0;
      let currentY = 0;

      this.currentCanvas.onmousemove = () => {
        ctx.putImageData(startCanvas, 0, 0);
        if(event.which == LEFT_MOUSE_BUTTON) {
          ctx.strokeStyle = document.querySelector('.main-color').style.background;
        }
        if(event.which == RIGHT_MOUSE_BUTTON) {
          ctx.strokeStyle = document.querySelector('.background-color').style.background;
        }
        currentX = Math.floor((this.currentCanvas.getAttribute("width") * event.offsetX) / WINDOW_SIZE);
        currentY = Math.floor((this.currentCanvas.getAttribute("height") * event.offsetY) / WINDOW_SIZE);
        let x=parseInt(startX)+0.50;
        let y=parseInt(startY)+0.50;
        ctx.strokeRect(x, y, currentX - startX, currentY - startY);
      };

      this.currentCanvas.onmouseup = () => {
        this.currentCanvas.dispatchEvent(new Event('canvas'));
        this.currentCanvas.onmousemove = null;
      };
    };
  };
  }
}
