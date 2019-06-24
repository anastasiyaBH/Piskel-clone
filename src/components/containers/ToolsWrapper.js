export default class ToolsWrapper {
  constructor() {
    this.toolsWrapper = document.createElement('ul');
    this.toolsWrapper.className = 'tool-wrapper';

    const toolColumn = document.querySelector('.tool-column');
    toolColumn.insertBefore(this.toolsWrapper,toolColumn.firstChild);
  }

  set () {
    this.toolsWrapper.onclick = (event) => {

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
