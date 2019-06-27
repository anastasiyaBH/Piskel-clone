const WINDOW_SIZE = 525;
const LEFT_MOUSE_BUTTON = 1;
const RIGHT_MOUSE_BUTTON = 3;

export default class Circle {
  constructor (canvas) {
    this.currentCanvas = canvas.getCanvas();

    this.rectangle = document.createElement('li');
    this.rectangle.className = 'tool-wrapper__tool';
    this.rectangle.classList.add('circle');

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

        ctx.beginPath();
        let r = parseInt (Math.sqrt(Math.pow(currentX - startX,2) + Math.pow(currentY - startY,2)) / 2) + 0.5;
        let x = startX + (currentX - startX) /2.;
        let y = startY + (currentY - startY) /2.;
        // eslint-disable-next-line no-console
        console.log(x,y,r);
        ctx.arc(x,y ,r ,0,Math.PI * 2,true);
        ctx.stroke();

        this.currentCanvas.dispatchEvent(new Event('canvas'));
      };
    };
  };
  }
}
