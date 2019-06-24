/* eslint-disable no-console */
export default class Resize {
  constructor() {
    this.resize = document.createElement('div');
    this.resize.classList.add('aplication-action-wrapper__action');
    this.resize.classList.add('resize');

    document.querySelector('.aplication-action-wrapper').appendChild(this.resize);
  }

  set () {
    this.resize.onclick = () => {

      if(this.resize.classList.contains('selected-action')) return;

      let settingColumn = document.querySelector('.setting-column');
      settingColumn.classList.add('enabled');

      settingColumn.innerHTML =
      `<h3 class="setting-column__name">Resize</h3>
      <form class="setting-form">
        <span class="setting-form__text">Size</span>
        <input class="setting-form__input-text" type="text" width="20">
        <span class="setting-form__text">px</span>

        <button class="setting-form__button" type>Resize</button>
      </form>`;

      let form =  document.querySelector('.setting-form');

      form.onsubmit = (event) => {
        event.preventDefault();
        let inputText = document.querySelector('.setting-form__input-text');
        console.log(inputText.value);
        if(inputText.value != null){
          let canvasList = document.querySelectorAll('.canvas');
          canvasList.forEach((val) => {

            let scanvas = document.createElement('canvas');
            scanvas.setAttribute("width", `${val.getAttribute("width")}`);
            scanvas.setAttribute("height", `${val.getAttribute("height")}`);
            let destCtx = scanvas.getContext('2d');
            destCtx.drawImage(val, 0, 0);

            val.setAttribute("width", `${inputText.value}`);
            val.setAttribute("height", `${inputText.value}`);
            destCtx = val.getContext('2d');
            destCtx.drawImage(scanvas, 0, 0);

            let openSetting = document.querySelector('.enabled');
            if (openSetting) {
              openSetting.classList.remove('enabled');
            }

            let selectedAction = document.querySelector('.selected-action');
            if (selectedAction) {
              selectedAction.classList.remove('selected-action');
            }
          });
        }
    };
    };
  }

}
