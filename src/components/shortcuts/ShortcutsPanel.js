import './shortcutsPanel.css'
import {shortcuts} from './shortcuts'

export default class ShortcutsPanel{
  constructor() {
    this.shortcutsPanel = document.createElement('div');
    this.shortcutsPanel.className = 'shortcuts-panel';

    let headerArea = document.createElement('div');
    headerArea.className = 'header-area';
    let header = document.createElement('h3');
    header.innerHTML = 'Keyboard shortcuts';
    headerArea.appendChild(header);

    this.closePanelButton = document.createElement('button');
    this.closePanelButton.className = 'header-area__close-button';
    this.closePanelButton.innerHTML = 'X';
    headerArea.appendChild(this.closePanelButton);

    this.shortcutsButton = document.createElement('button');
    this.shortcutsButton.className = 'shortcuts-button';
    this.shortcutsList = document.createElement('ul');
    this.shortcutsList.className = 'shortcuts-list';
    this.shortcutsPanel.appendChild(headerArea);
    this.shortcutsPanel.appendChild(this.shortcutsList);

    for(let key in shortcuts) {
      let item = document.createElement('li');
      item.className = 'shortcuts-item';

      let name = document.createElement('span');
      name.className = 'shortcuts-item__name';
      name.innerHTML = key;

      let input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('value', shortcuts[key] );
      input.setAttribute('name', key);
      input.className = 'shortcuts-item__input';

      item.appendChild(name);
      item.appendChild(input);

      this.shortcutsList.appendChild(item);
    }

    document.querySelector('.tool-column').appendChild(this.shortcutsPanel);
    document.querySelector('.tool-column').appendChild( this.shortcutsButton);
  }

  set() {
    this.shortcutsButton.addEventListener('click', () => {
      this.shortcutsPanel.classList.add('enabled');
    });

    this.closePanelButton.addEventListener('click', () => {
      this.shortcutsPanel.classList.remove('enabled');
    });

    this.shortcutsList.addEventListener('change', (event) => {
      event.target.getAttribute('value', event.target.value);
      shortcuts[event.target.getAttribute('name')] = event.target.value;
      event.preventDefault();
    });

  }
}
