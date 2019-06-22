/* eslint-disable no-console */
export default class ToolsWrapper {
  constructor() {
    this.toolsWrapper = document.createElement('li');
    this.toolsWrapper.className = 'tool-wrapper';

    document.querySelector('.tool-column').appendChild(this.toolsWrapper);
  }

  set () {
    this.toolsWrapper.onclick = (event) => {

    console.log(event.target.classList);
    if(event.target.classList.contains('tool-wrapper__tool')) {

      document.querySelectorAll('.tool-wrapper__tool').forEach((value) => {
        if(value.classList.contains('selected')) {
          value.classList.remove('selected');
        }
      });
      event.target.classList.add('selected');
    }
  };
  }
}
