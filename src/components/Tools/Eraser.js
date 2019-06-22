const WINDOW_SIZE = 525;

export default class Eraser {
  constructor (canvas) {
    this.currentCanvas = canvas.getCanvas();
    this.canvasSize = canvas.getSize();

    this.eraser = document.createElement('li');
    this.eraser.className = 'tool-wrapper__tool';
    this.eraser.innerHTML = '<i class="fas fa-eraser"></i>';

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
        ctx.clearRect(x,y,1,1);
      };

      this.currentCanvas.onmouseup = () => {
        this.currentCanvas.onmousemove = null;
      };
    };
  }
}
