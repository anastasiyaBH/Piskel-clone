import './preview.css'

export default class Preview {
  constructor(frameList, canvas) {

    this.frameList = frameList;
    this.currentCanvas = canvas;
    this.timerId = 0;
    this.speedAnimation = 0;

    this.previewArea = document.createElement('div');
    this.previewArea.classList.add('preview-area');

    document.querySelector('.animation-column').appendChild(this.previewArea);

    this.preview = document.createElement('canvas');
    this.preview.classList.add('preview-area__canvas');
    this.preview.classList.add('canvas');
    this.preview.setAttribute('width', this.currentCanvas.getCanvas().getAttribute('width'));
    this.preview.setAttribute('height', this.currentCanvas.getCanvas().getAttribute('height'));
    this.previewArea.appendChild(this.preview);

    this.button = document.createElement('button');
    this.button.classList.add('preview-area__fullscreen-button');
    this.previewArea.appendChild(this.button);

    this.range = document.createElement('input');
    this.range.setAttribute('type', 'range');
    this.range.setAttribute('min', '0');
    this.range.setAttribute('max', '24');
    this.range.setAttribute('step', '1');
    this.range.classList.add('preview-area__range');

    this.speedLabel = document.createElement('span');
    this.speedLabel.innerHTML = `${this.speedAnimation} FPS`;
    this.speedLabel.classList.add('preview-area__speedLabel');
    this.previewArea.appendChild(this.speedLabel);
  }
    set() {
    this.range.addEventListener('input', (e) => {
      let count = 0;
      // eslint-disable-next-line prefer-destructuring
      const canvas = this.preview;
      const frameList = this.frameList;

      function animation() {
        if (frameList[count] == null) return;
        const destCtx = canvas.getContext('2d');
        destCtx.clearRect(0, 0, canvas.width, canvas.height);
        destCtx.drawImage(frameList[count].getCanvasIcon(), 0, 0);

        count = count + 1;
        if (count === frameList.length) count = 0;
      }

      clearInterval(this.timerId);

      this.speedAnimation = +(e.target.value);
      this.speedLabel.innerHTML = `${this.speedAnimation} SPF`;

      if (this.speedAnimation === 0) {
        clearInterval(this.timerId);
      } else {
        this.timerId = setInterval(animation, 1000 / this.speedAnimation);
      }
    });

    this.previewArea.appendChild(this.range);

    this.button.addEventListener('click', () => {
      this.preview.requestFullscreen();
    });

  }
}
