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
    this.addFrameButton.innerHTML = 'Add frame';
    document.querySelector('.frame-column').appendChild(this.addFrameButton);
  }

  set() {
    let addNewFrameFunction = (canvas) => {
      let newFrame = new Frame(canvas);
      if(this.currentFrame !== null) {
        this.currentFrame.getFrame().classList.remove('selected');
      }
      this.currentFrame = newFrame;
      this.currentCanvas.setCanvasImage(this.currentFrame.getCanvasIcon());
      this.currentFrame.getFrame().classList.add('selected');
      this.frameWrapper.appendChild(newFrame.getFrame());
      this.frameList.push(newFrame);
      this.frameList.forEach((val, i) => {
        val.setNumber(i + 1);
      });
    };

    addNewFrameFunction(this.currentCanvas);


    this.currentCanvas.getCanvas().addEventListener('canvas', () => {
      this.currentFrame.setFrameIcon();
    });

    this.addFrameButton.onclick = () => {
      addNewFrameFunction(this.currentCanvas);
  }

    this.frameWrapper.onclick = (event) => {

      if(event.target.classList.contains('delete-button')) {
        if(this.frameList.length === 1) {
          alert('Last frame!');
          return;
        }

        let deleteFrame = event.target.parentNode.parentNode;
        let isRemoveInlist = false;
        this.frameList.forEach((val,i) => {
          if(deleteFrame === val.getFrame()) {

            if(this.currentFrame === val) {
              if(i) {
              this.currentFrame = this.frameList[i - 1];
              } else {
                this.currentFrame = this.frameList[i + 1];
              }
              this.currentFrame.getFrame().classList.add('selected');
              this.currentCanvas.setCanvasImage(this.currentFrame.getCanvasIcon());
            }

            this.frameList.splice(i,1);
            isRemoveInlist = true;
          }
        });
        if(isRemoveInlist) {
          deleteFrame.remove();
        }
        this.frameList.forEach((val, i) => {
          val.setNumber(i + 1);
        });
      }

      if(event.target.classList.contains('duplicate-button')) {
        let duplicateFrame = event.target.parentNode.parentNode;

        this.frameList.forEach((val) => {
          if(duplicateFrame === val.getFrame()) {
            let copy = new Frame(this.currentCanvas);

            copy.setFrameIcon(val.getCanvasIcon());
            this.frameList.push(copy);

            this.frameWrapper.appendChild(copy.getFrame());
          }
        });
        this.frameList.forEach((val, i) => {
          val.setNumber(i + 1);
        });
      }

      if(event.target.classList.contains('frame-inform__frame-action')) {
        let workFrame = event.target.parentNode;

        this.frameList.forEach((val) => {
          if(workFrame === val.getFrame()) {
            this.currentFrame.getFrame().classList.remove('selected');

            this.currentFrame = val;
            this.currentFrame.getFrame().classList.add('selected');

            this.currentCanvas.setCanvasImage(this.currentFrame.getCanvasIcon());
          }
        });
        this.frameList.forEach((val, i) => {
          val.setNumber(i + 1);
        });
      }
    };
  }


}
