export default class AplicationActionWrapper {
  constructor() {
    this.aplicationActionWrapper = document.createElement('div');
    this.aplicationActionWrapper.className = 'aplication-action-wrapper';

    document.querySelector('.aplication-action-column').appendChild(this.aplicationActionWrapper);
  }

  set() {
    this.aplicationActionWrapper.onclick = (event) => {

      if (event.target.classList.contains('aplication-action-wrapper__action')) {

        document.querySelectorAll('.aplication-action-wrapper__action').forEach((value) => {
          if (value.classList.contains('selected-action')) {
            value.classList.remove('selected-action');
          }
        });
        event.target.classList.add('selected-action');
      }
    };
  }
}
