import AbstractComponent from './abstract-component.js';

export default class UserRatingInput extends AbstractComponent {
  constructor(rating, userRating) {
    super();
    this._rating = rating;
    this._userRating = userRating;
    this._rating = rating;
  }

  getTemplate() {
    return `<input type="radio" 
    name="score" 
    class="film-details__user-rating-input visually-hidden" 
    value="${this._rating}" 
    id="rating-${this._rating}" 
    ${this._rating == this._userRating ? `checked` : ``}>`
  }
}
