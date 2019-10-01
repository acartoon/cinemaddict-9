import AbstractComponent from './abstract-component.js';

export default class UserRatingLabel extends AbstractComponent {
  constructor(rating, onDataChange) {
    super();
    this._rating = rating;
    this._onDataChange = onDataChange;

    this._onclick();
  }

  getTemplate() {
    return `<label class="film-details__user-rating-label" for="rating-${this._rating}">${this._rating}</label>`;
  }

  _onclick() {
    this.getElement().addEventListener(`click`, () => {
      this._onDataChange(this._rating);
    })
  }
}
