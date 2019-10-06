import AbstractComponent from './abstract-component.js';

export default class MovieBtnStateLabel extends AbstractComponent {
  constructor({name, label}, onDataChange) {
    super();
    this._name = name;
    this._label = label;
    this._onDataChange = onDataChange;
    this._onClick();
  }

  _onClick() {
    this.getElement().addEventListener(`click`, (evt) => {
      this._onDataChange(`userState`, this._name);
    });
  }

  getTemplate() {
    return `<label for="${this._name}" class="film-details__control-label film-details__control-label--${this._name}">${this._label}</label>`;
  }
}
