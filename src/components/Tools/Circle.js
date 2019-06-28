import {LEFT_MOUSE_BUTTON, RIGHT_MOUSE_BUTTON, WINDOW_SIZE} from '../../const/const'

export default class Circle {
  constructor(canvas) {
    this.currentCanvas = canvas.getCanvas();

    this.circle = document.createElement('li');
    this.circle.className = 'tool-wrapper__tool';
    this.circle.classList.add('circle');

    document.querySelector('.tool-wrapper').appendChild(this.circle);
  }

  set() {
    this.circle.onclick = () => {
      const ctx = this.currentCanvas.getContext('2d');

      function putPixel(x, y) {
        ctx.fillRect(x, y, 1, 1);
      }

      this.currentCanvas.onmousedown = () => {
        let startCanvas = ctx.getImageData(0, 0, this.currentCanvas.getAttribute("width"), this.currentCanvas.getAttribute("height"));

        if (event.which == LEFT_MOUSE_BUTTON) {
          ctx.fillStyle = document.querySelector('.main-color').style.background;
        }
        if (event.which == RIGHT_MOUSE_BUTTON) {
          ctx.fillStyle = document.querySelector('.background-color').style.background;
        }

        let startX = Math.floor((this.currentCanvas.getAttribute("width") * event.offsetX) / WINDOW_SIZE);
        let startY = Math.floor((this.currentCanvas.getAttribute("height") * event.offsetY) / WINDOW_SIZE);

        this.currentCanvas.onmousemove = () => {
          ctx.putImageData(startCanvas, 0, 0);

          let currentX = Math.floor((this.currentCanvas.getAttribute("width") * event.offsetX) / WINDOW_SIZE);
          let currentY = Math.floor((this.currentCanvas.getAttribute("height") * event.offsetY) / WINDOW_SIZE);

          let r = parseInt(Math.sqrt(Math.pow(startX - currentX, 2) + Math.pow(startY - currentY, 2)) / 2);
          let x = parseInt(startX + (currentX - startX) / 2);
          let y = parseInt(startY + (currentY - startY) / 2);

          var x0 = 0, y0 = r, gap = 0, delta = (2 - 2 * r);

          while (y0 >= 0) {
            putPixel(x + x0, y - y0);
            putPixel(x - x0, y - y0);
            putPixel(x - x0, y + y0);
            putPixel(x + x0, y + y0);
            gap = 2 * (delta + y0) - 1;
            if (delta < 0 && gap <= 0) {
              x0++;
              delta += 2 * x0 + 1;
              continue;
            }
            if (delta > 0 && gap > 0) {
              y0--;
              delta -= 2 * y0 + 1;
              continue;
            }
            x0++;
            delta += 2 * (x0 - y0);
            y0--;
          }
        }
      };

      this.currentCanvas.onmouseup = () => {
        this.currentCanvas.dispatchEvent(new Event('canvas'));
        this.currentCanvas.onmousemove = null;
      };
    };
  }
}
