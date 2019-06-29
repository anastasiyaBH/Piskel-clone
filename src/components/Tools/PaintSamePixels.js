import {LEFT_MOUSE_BUTTON, RIGHT_MOUSE_BUTTON, WINDOW_SIZE, ALPHA} from '../../const/const'

export default class PaintSamePixels {
  constructor(canvas) {
    this.currentCanvas = canvas.getCanvas();

    this.tool = document.createElement('li');
    this.tool.className = 'tool-wrapper__tool';
    this.tool.classList.add('paint-same-pixels');

    document.querySelector('.tool-wrapper').appendChild(this.tool);
  }

  set() {
    this.tool.onclick = () => {
      this.currentCanvas.onmousedown = (event) => {

        function parseRGB (rgb) {
          let arrRGB = rgb.match(/\d+/g);
          return {
            r: arrRGB[0],
            g: arrRGB[1],
            b :arrRGB[2],
            a: ALPHA,
          }
        }

        let color;

        if(event.which == LEFT_MOUSE_BUTTON) {
          color = parseRGB(document.querySelector('.main-color').style.background);
        }

        if(event.which == RIGHT_MOUSE_BUTTON) {
          color =  parseRGB(document.querySelector('.background-color').style.background);
        }

        let sizeX = this.currentCanvas.getAttribute("width");
        let sizeY = this.currentCanvas.getAttribute("height");

        let startX = Math.floor((sizeX * event.offsetX) / WINDOW_SIZE);
        let startY = Math.floor((sizeY * event.offsetY) / WINDOW_SIZE);

        let ctx = this.currentCanvas.getContext('2d');
        let pixelColor = ctx.getImageData(startX, startY, 1, 1).data;

        let imgColor = ctx.getImageData(0,0,sizeX,sizeY);
        let imgColorArray = imgColor.data;

       for (var i = 0; i < imgColorArray.length; i += 4) {
          if(imgColorArray[i] == pixelColor[0] && imgColorArray[i+1] == pixelColor[1] &&
             imgColorArray[i+2] == pixelColor[2] && imgColorArray[i+3] == pixelColor[3]) {
          imgColorArray[i]     = color.r;
          imgColorArray[i + 1] = color.g;
          imgColorArray[i + 2] = color.b;
          imgColorArray[i + 3] = color.a;
          }
        }
        ctx.putImageData(imgColor, 0, 0);
        this.currentCanvas.dispatchEvent(new Event('canvas'));
      };

    };
  }
}
