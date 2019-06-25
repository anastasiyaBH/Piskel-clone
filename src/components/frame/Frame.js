export default class Frame {
  constructor(canvas) {
    this.currentCanvas = canvas;

    this.frame = document.createElement('li');
    this.frame.classList.add('frame-inform');

    this.canvasIcon = document.createElement('canvas');
    this.canvasIcon.setAttribute("width", this.currentCanvas.getCanvas().getAttribute("width"));
    this.canvasIcon.setAttribute("height", this.currentCanvas.getCanvas().getAttribute("height"));
    this.canvasIcon.className = 'frame-inform__canvas-icon';
    this.canvasIcon.classList.add('canvas');

    this.frameAction = document.createElement('div');
    this.frameAction.classList.add('frame-inform__frame-action');

    this.numberButton = document.createElement('button');
    this.numberButton.classList.add('frame-inform__button');
    this.numberButton.classList.add('number-button');

    this.duplicateButton = document.createElement('button');
    this.duplicateButton.classList.add('frame-inform__button');
    this.duplicateButton.classList.add('duplicate-button');

    this.deleteButton = document.createElement('button');
    this.deleteButton.classList.add('frame-inform__button');
    this.deleteButton.classList.add('delete-button');

    this.dragndropButton = document.createElement('button');
    this.dragndropButton.classList.add('frame-inform__button');
    this.dragndropButton.classList.add('dragndrop-button');

    this.frame.appendChild(this.canvasIcon);
    this.frame.appendChild(this.numberButton);

    this.frameAction.appendChild(this.duplicateButton);
    this.frameAction.appendChild(this.deleteButton);
    this.frameAction.appendChild(this.dragndropButton);

    this.frame.appendChild(this.frameAction);

  }

  getFrame() {
    return this.frame;
  }

  getCanvasIcon() {
    return this.canvasIcon;
  }

  setNumber(number) {
    this.numberButton.innerHTML = number;
  }

  setFrameIcon(icon) {
    let ctx = this.canvasIcon.getContext('2d');

    if (icon == null) {
      ctx.drawImage(this.currentCanvas.getCanvas(), 0, 0);
    }
    else {
      ctx.drawImage(icon, 0, 0);
    }

  }
}
