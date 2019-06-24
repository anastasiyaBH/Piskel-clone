import Frame from '../frame/Frame'

export default class FrameWrapper {
  constructor(canvas) {
    this.currentCanvas = canvas;

    this.currentFrame = null;

    this.frameList = [];

    this.frameWrapper = document.createElement('ul');
    this.frameWrapper.className = 'frame-wrapper';
    document.querySelector('.frame-column').appendChild(this.frameWrapper);

    this.addFrameButton = document.createElement('button');
    this.addFrameButton.className = 'frame-wrapper__add-frame-button';
    this.addFrameButton.innerHTML = '<i class="fas fa-plus"></i> Add frame';
    document.querySelector('.frame-column').appendChild(this.addFrameButton);
  }

  set() {
    let addNewFrameFunction = () => {
      let newFrame = new Frame(this.currentCanvas);
      this.currentFrame = newFrame;
      newFrame.setFrameIcon();
      this.frameWrapper.appendChild(newFrame.getFrame());
      this.frameList.push(newFrame);
      this.frameList.forEach((val, i) => {
        val.setNumber(i + 1);
      });
    };

    addNewFrameFunction();

    this.addFrameButton.onclick = addNewFrameFunction;

    this.currentCanvas.getCanvas().addEventListener('canvas', () => {
      this.currentFrame.setFrameIcon();
    });
  }

}
