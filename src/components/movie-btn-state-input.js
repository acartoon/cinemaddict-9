import AbstractComponent from './abstract-component.js';

export default class MovieBtnStateInput extends AbstractComponent {
  constructor({data, name}) {
    super();
    this._name = name;
    this._data = data;
  }

  getTemplate() {
    return `<input type="checkbox" class="film-details__control-input visually-hidden" id="${this._name}" name="${this._name}" 
    ${this._data ? `checked` : ``}>`;
  }
}
