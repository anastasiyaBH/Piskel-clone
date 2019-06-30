import './action.css';
import { isPositiveNumeric } from '../../additional/additional';
import { WINDOW_SIZE } from '../../const/const'

export default class Resize {
  constructor(canvas) {
    this.resize = document.createElement('div');
    this.resize.classList.add('aplication-action-wrapper__action');
    this.resize.classList.add('resize');

    document.querySelector('.aplication-action-wrapper').appendChild(this.resize);

    this.currentCanvas = canvas;
  }

  set() {
    this.resize.onclick = () => {

      if (this.resize.classList.contains('selected-action')) return;

      let settingColumn = document.querySelector('.setting-column');
      settingColumn.classList.add('enabled');

      settingColumn.innerHTML =
        `<h3 class="setting-column__name">Resize</h3>
      <form class="setting-form">
      <div class="input-area">
          <span class="setting-form__text">Width</span>
          <input class="setting-form__input-text input-width" type="text" width="20">
          <span class="setting-form__text">px</span>
      </div>
      <div class="input-area">
          <span class="setting-form__text">Height</span>
          <input class="setting-form__input-text input-height" type="text" width="20">
          <span class="setting-form__text">px</span>
      </div>
        <button class="setting-form__button" type>Resize</button>
      </form>`;

      let form = document.querySelector('.setting-form');

      let closeButton = document.createElement('button');
      closeButton.className = 'setting-column__close-button';
      closeButton.innerHTML = 'X';
      document.querySelector('.setting-column').appendChild(closeButton);

      closeButton.addEventListener('click', () => {
        settingColumn.classList.remove('enabled');
        this.resize.classList.remove('selected-action');
      });

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        let inputTextWidth = settingColumn.querySelector('.input-width');
        let inputTextHeight = settingColumn.querySelector('.input-height');

        if (isPositiveNumeric(inputTextWidth.value) && isPositiveNumeric(inputTextHeight.value)) {
          let width = (+(inputTextWidth.value) > WINDOW_SIZE) ? WINDOW_SIZE : inputTextWidth.value;
          let height = (+(inputTextHeight.value) > WINDOW_SIZE) ? WINDOW_SIZE : inputTextHeight.value;

          let canvasList = document.querySelectorAll('.canvas');
          canvasList.forEach((val) => {

            let scanvas = document.createElement('canvas');
            scanvas.setAttribute("width", `${val.getAttribute("width")}`);
            scanvas.setAttribute("height", `${val.getAttribute("height")}`);
            let destCtx = scanvas.getContext('2d');
            destCtx.drawImage(val, 0, 0);

            val.setAttribute("width", `${width}`);
            val.setAttribute("height", `${height}`);
            destCtx = val.getContext('2d');
            destCtx.drawImage(scanvas, 0, 0);
          });

          this.currentCanvas.getCanvas().dispatchEvent(new Event('resize'));
          this.currentCanvas.getCanvas().dispatchEvent(new Event('click'));

          let openSetting = document.querySelector('.enabled');
          if (openSetting) {
            openSetting.classList.remove('enabled');
          }

          let selectedAction = document.querySelector('.selected-action');
          if (selectedAction) {
            selectedAction.classList.remove('selected-action');
          }
        }
      });
    };
  }

}
