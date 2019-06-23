/* eslint-disable no-undef */
export default class ColorSelector {
  constructor () {
    this.primary = document.createElement('div');
    this.primary.classList.add ('palette-wrapper__color');
    this.primary.classList.add ('main-color');

    this.secondary = document.createElement('div');
    this.secondary.classList.add ('palette-wrapper__color');
    this.secondary.classList.add ('background-color');

    this.swapButton = document.createElement('div');
    this.swapButton.classList.add ('palette-wrapper__change-button');
    this.swapButton.innerHTML = '<i class="fas fa-sync-alt"></i>';


    document.querySelector('.palette-wrapper').appendChild(this.primary);
    document.querySelector('.palette-wrapper').appendChild(this.secondary);
    document.querySelector('.palette-wrapper').appendChild( this.swapButton);
  }

  set() {

    $(this.primary).spectrum({
      containerClassName: 'gray',
      showButtons: false,
      showPalette: true,
      allowEmpty:true,
      showInput: true,

      palette: [ ],
      showSelectionPalette: true,
      selectionPalette: ["red", "green", "blue"],

      hide: function(color) {
        this.style.background = color.toHexString();
       },
  });

  $(this.secondary).spectrum({
    containerClassName: 'gray',
    showButtons: false,
    showPalette: true,
    allowEmpty:true,
    showInput: true,

    palette: [ ],
    showSelectionPalette: true,
    selectionPalette: ["red", "green", "blue"],

    hide: function(color) {
      this.style.background = color.toHexString();
     },
  });

  this.swapButton.onclick = () => {
    let primaryColor = this.primary.style.background;
    let secondaryColor = this.secondary.style.background;

    this.primary.style.background = secondaryColor;
    this.secondary.style.background = primaryColor;
  };
  }
}
