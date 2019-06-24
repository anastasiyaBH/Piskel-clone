const WINDOW_SIZE = 525;
const LEFT_MOUSE_BUTTON = 1;
const RIGHT_MOUSE_BUTTON = 3;

export default class Pen {
  constructor (canvas) {
    this.currentCanvas = canvas.getCanvas();

    this.pen = document.createElement('li');
    this.pen.className = 'tool-wrapper__tool';
    this.pen.classList.add('pen');

    document.querySelector('.tool-wrapper').appendChild(this.pen);
  }

  set () {
    this.pen.onclick = () => {
    this.currentCanvas.onmousedown = () => {
      this.currentCanvas.onmousemove = (event) => {
        event.preventDefault();
        let x = Math.floor((this.currentCanvas.getAttribute("width") * event.offsetX) / WINDOW_SIZE);
        let y = Math.floor((this.currentCanvas.getAttribute("height") * event.offsetY) / WINDOW_SIZE);

        const ctx = this.currentCanvas.getContext('2d');

        if(event.which == LEFT_MOUSE_BUTTON) {
          ctx.fillStyle = document.querySelector('.main-color').style.background;
        }

        if(event.which == RIGHT_MOUSE_BUTTON) {
          ctx.fillStyle = document.querySelector('.background-color').style.background;
        }
        ctx.fillRect(x,y,1,1);
      };

      this.currentCanvas.onmouseup = () => {
        this.currentCanvas.onmousemove = null;
      };
    };
  };
  }
}
