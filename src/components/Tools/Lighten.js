import { WINDOW_SIZE } from '../../const/const'

export default class Lighten {
  constructor(canvas) {
    this.currentCanvas = canvas.getCanvas();

    this.lighten = document.createElement('li');
    this.lighten.className = 'tool-wrapper__tool';
    this.lighten.classList.add('lighten');

    document.querySelector('.tool-wrapper').appendChild(this.lighten);

    this.effect = 5;
  }

  start() {
    this.lighten.dispatchEvent(new Event('tool', { "bubbles": true }));
    let effect;
    this.currentCanvas.onmousedown = () => {

      let prevPixel = {
        x: 0,
        y: 0,
      };

      this.currentCanvas.onmousemove = (event) => {
        event.preventDefault();
        let x = Math.floor((this.currentCanvas.getAttribute("width") * event.offsetX) / WINDOW_SIZE);
        let y = Math.floor((this.currentCanvas.getAttribute("height") * event.offsetY) / WINDOW_SIZE);

        effect = (event.ctrlKey) ? -this.effect : this.effect;

        let ctx = this.currentCanvas.getContext('2d');
        let pixelImg = ctx.getImageData(x, y, 1, 1);
        let pixelData = pixelImg.data;

        if (event.shiftKey) {
          if (prevPixel.x !== x || prevPixel.y !== y) {
            pixelData[0] += effect;
            pixelData[1] += effect;
            pixelData[2] += effect;

            prevPixel.x = x;
            prevPixel.y = y;
          }
        } else {
          pixelData[0] += effect;
          pixelData[1] += effect;
          pixelData[2] += effect;
        }

        ctx.putImageData(pixelImg, x, y);
      };

      this.currentCanvas.onmouseup = () => {
        this.currentCanvas.onmousemove = null;
        this.currentCanvas.dispatchEvent(new Event('canvas'));
      };
    };
  }

  set() {
    this.lighten.onclick = () => {
      this.start();
    };
  }
}
