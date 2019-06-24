export default class FrameWrapper {
  constructor() {
    this.frameWrapper = document.createElement('ul');
    this.frameWrapper.className = 'frame-wrapper';

    document.querySelector('.frame-column').appendChild(this.frameWrapper);
  }

  set () {
    }

}
