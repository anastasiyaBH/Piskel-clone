const WINDOW_SIZE = 525;
const LEFT_MOUSE_BUTTON = 1;
const RIGHT_MOUSE_BUTTON = 3;

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
    this.currentCanvas.onmousedown = () => {
      let startX = Math.floor((this.currentCanvas.getAttribute("width") * event.offsetX) / WINDOW_SIZE);
      let startY = Math.floor((this.currentCanvas.getAttribute("height") * event.offsetY) / WINDOW_SIZE);

      let currentX = 0;
      let currentY = 0;
      const ctx = this.currentCanvas.getContext('2d');

      this.currentCanvas.onmouseup = () => {

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
        this.currentCanvas.dispatchEvent(new Event('canvas'));
      };
    };
  };
  }
}
