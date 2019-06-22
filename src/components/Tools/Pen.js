const WINDOW_SIZE = 525;

export default class Pen {
  constructor (canvas) {
    this.currentCanvas = canvas.getCanvas();
    this.canvasSize = canvas.getSize();

    this.pen = document.createElement('li');
    this.pen.className = 'tool-wrapper__tool';
    this.pen.innerHTML = '<i class="fas fa-pen"></i>';

    document.querySelector('.tool-wrapper').appendChild(this.pen);
  }

  set () {
    this.currentCanvas.onmousedown = () => {
      this.currentCanvas.onmousemove = (event) => {
        let x = Math.floor((this.canvasSize * event.offsetX) / WINDOW_SIZE);
        let y = Math.floor((this.canvasSize * event.offsetY) / WINDOW_SIZE);
        // eslint-disable-next-line no-console
        console.log(x, y);

        const ctx = this.currentCanvas.getContext('2d');
        ctx.fillRect(x,y,1,1);
      };

      this.currentCanvas.onmouseup = () => {
        this.currentCanvas.onmousemove = null;
      };
    };
  }
}
