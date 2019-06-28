import {LEFT_MOUSE_BUTTON, RIGHT_MOUSE_BUTTON, WINDOW_SIZE} from '../../const/const'

export default class PaintBucket {
  constructor (canvas) {
    this.currentCanvas = canvas.getCanvas();

    this.paintBucket = document.createElement('li');
    this.paintBucket.className = 'tool-wrapper__tool';
    this.paintBucket.classList.add('bucket');

    document.querySelector('.tool-wrapper').appendChild(this.paintBucket);
  }

  set () {
    this.paintBucket.onclick = () => {
    this.currentCanvas.onmousedown = () => {
      event.preventDefault();
      let startX = Math.floor((this.currentCanvas.getAttribute("width") * event.offsetX) / WINDOW_SIZE);
      let startY = Math.floor((this.currentCanvas.getAttribute("height") * event.offsetY) / WINDOW_SIZE);

      const ctx = this.currentCanvas.getContext('2d');

      function parseRGB (rgb) {
        let arrRGB = rgb.match(/\d+/g);
        return {
          r: arrRGB[0],
          g: arrRGB[1],
          b :arrRGB[2],
        }
      }

      let color;

      if(event.which == LEFT_MOUSE_BUTTON) {
        color = parseRGB(document.querySelector('.main-color').style.background);
      }

      if(event.which == RIGHT_MOUSE_BUTTON) {
        color =  parseRGB(document.querySelector('.background-color').style.background);
      }

      floodFill(startX, startY, color, this.currentCanvas.getAttribute("width"));

      function  getPixelPos (x, y, size) {
        return (y * size + x) * 4;
      }

      function matchStartColor (data, pos, startColor) {
        return (data[pos]   === startColor.r &&
                data[pos+1] === startColor.g &&
                data[pos+2] === startColor.b &&
                data[pos+3] === startColor.a);
      }

      function colorPixel (data, pos, color) {
        data[pos] = color.r || 0;
        data[pos+1] = color.g || 0;
        data[pos+2] = color.b || 0;
        data[pos+3] = color.hasOwnProperty("a") ? color.a : 255;
      }

      function floodFill (startX, startY, fillColor, size) {

        let dstImg = ctx.getImageData(0,0, size , size);
        let dstData = dstImg.data;

        let startPos = getPixelPos(startX, startY,size);
        let startColor = {
          r: dstData[startPos],
          g: dstData[startPos+1],
          b: dstData[startPos+2],
          a: dstData[startPos+3]
        };

        let todo = [[startX,startY]];

        while (todo.length) {
          let pos = todo.pop();
          let x = pos[0];
          let y = pos[1];
          let currentPos = getPixelPos(x, y,size);

          while((y-- >= 0) && matchStartColor(dstData, currentPos, startColor)) {
            currentPos -=  size * 4;
          }

          currentPos +=  size * 4;
          ++y;
          let reachLeft = false;
          let reachRight = false;

          while((y++ <  size-1) && matchStartColor(dstData, currentPos, startColor)) {

            colorPixel(dstData, currentPos, fillColor);

            if (x > 0) {
              if (matchStartColor(dstData, currentPos-4, startColor)) {
                if (!reachLeft) {
                  todo.push([x-1, y]);
                  reachLeft = true;
                }
              }
              else if (reachLeft) {
                reachLeft = false;
              }
            }

            if (x <  size - 1) {
              if (matchStartColor(dstData, currentPos+4, startColor)) {
                if (!reachRight) {
                  todo.push([x+1, y]);
                  reachRight = true;
                }
              }
              else if (reachRight) {
                reachRight = false;
              }
            }

            currentPos += size * 4;
          }
        }

        ctx.putImageData(dstImg,0,0);
      }

    };
    this.currentCanvas.dispatchEvent(new Event('canvas'));
    };
  }
}
