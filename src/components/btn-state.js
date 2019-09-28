import AbstractComponent from './abstract-component.js';

export default class BtnState extends AbstractComponent {
  constructor({stateData, name, label}, onDataChange) {
    super();
    this._stateData = stateData;
    this._name = name;
    this._label = label;
    this._onDataChange = onDataChange;

    // this._onClick();
  }

  getTemplate() {
    return `<input type="checkbox" class="film-details__control-input visually-hidden" id="${this._name}" name="${this._name}" ${this._stateData ? `checked` : ``}>
    <label for="${this._name}" class="film-details__control-label film-details__control-label--watchlist">${this._label}</label>`;
  }

  _onClick() {
    this.getTest().addEventListener(`click`, (evt) => {
      console.log(this._name);
    })
  }
}
