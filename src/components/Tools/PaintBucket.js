const WINDOW_SIZE = 525;

export default class PaintBucket {
  constructor (canvas) {
    this.currentCanvas = canvas.getCanvas();
    this.canvasSize = canvas.getSize();

    this.paintBucket = document.createElement('li');
    this.paintBucket.className = 'tool-wrapper__tool';
    this.paintBucket.innerHTML = '<i class="fas fa-fill-drip"></i>';

    document.querySelector('.tool-wrapper').appendChild(this.paintBucket);
  }

  set () {
    this.paintBucket.onclick = () => {
    this.currentCanvas.onmousedown = () => {
      let startX = Math.floor((this.canvasSize * event.offsetX) / WINDOW_SIZE);
      let startY = Math.floor((this.canvasSize * event.offsetY) / WINDOW_SIZE);

      const ctx = this.currentCanvas.getContext('2d');

      floodFill(startX, startY, {r:255}, this.canvasSize);

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

        var dstImg = ctx.getImageData(0,0, size , size);
        var dstData = dstImg.data;

        var startPos = getPixelPos(startX, startY,size);
        var startColor = {
          r: dstData[startPos],
          g: dstData[startPos+1],
          b: dstData[startPos+2],
          a: dstData[startPos+3]
        };

        var todo = [[startX,startY]];

        while (todo.length) {
          var pos = todo.pop();
          var x = pos[0];
          var y = pos[1];
          var currentPos = getPixelPos(x, y,size);

          while((y-- >= 0) && matchStartColor(dstData, currentPos, startColor)) {
            currentPos -=  size * 4;
          }

          currentPos +=  size * 4;
          ++y;
          var reachLeft = false;
          var reachRight = false;

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
    };
  }
}
