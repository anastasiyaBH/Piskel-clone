/* eslint-disable no-console */
const WINDOW_SIZE = 525;
const LEFT_MOUSE_BUTTON = 1;
const RIGHT_MOUSE_BUTTON = 3;

export default class Stroke {
  constructor(canvas) {
    this.currentCanvas = canvas.getCanvas();

    this.stroke = document.createElement('li');
    this.stroke.className = 'tool-wrapper__tool';
    this.stroke.classList.add('stroke');

    document.querySelector('.tool-wrapper').appendChild(this.stroke);
  }

  set() {
    this.stroke.onclick = () => {
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

          let dx = Math.abs(currentX - startX);
          let dy = Math.abs(currentY - startY);

          let sx = (currentX >= startX) ? (1) : (-1);
          let sy = (currentY >= startY) ? (1) : (-1);

          putPixel(startX, startY);
          let d, d1, d2, x, y;

          if (dy < dx) {
            d = (dy << 1) - dx;
            d1 = dy << 1;
            d2 = (dy - dx) << 1;
            x = startX + sx;
            y = startY;
            for (let i = 1; i <= dx; i++) {
              if (d > 0) {
                d += d2;
                y += sy;
              } else {
                d += d1;
              }
              putPixel(x, y);
              x += sx;
            }
          }
          else {
            d = (dx << 1) - dy;
            d1 = dx << 1;
            d2 = (dx - dy) << 1;
            x = startX;
            y = startY + sy;
            for (let i = 1; i <= dy; i++) {
              if (d > 0) {
                d += d2;
                x += sx;
              } else {
                d += d1;
              }
              putPixel(x, y);
              y += sy;
            }
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
