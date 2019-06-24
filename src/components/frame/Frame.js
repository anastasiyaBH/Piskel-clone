export default class Frame {
  constructor (canvas) {
    this.currentCanvas = canvas;

    this.frame = document.createElement('li');
    this.frame.classList.add('frame-inform');

    this.canvasIcon = document.createElement('canvas');
    this.canvasIcon.setAttribute("width", this.currentCanvas.getAttribute("width"));
    this.canvasIcon.setAttribute("height", this.currentCanvas.getAttribute("height"));
    this.canvasIcon.className = 'frame-inform__canvas-icon';

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
    this.frame.appendChild(this.duplicateButton);
    this.frame.appendChild(this.deleteButton);
    this.frame.appendChild(this.dragndropButton);

    document.querySelector('.frame-column').appendChild(this.frame);
  }
}
