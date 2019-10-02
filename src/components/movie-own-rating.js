import AbstractComponent from './abstract-component';
import {render, Position} from '../utils';
import UserRatingInput from './user-rating-input';
import UserRatingLabel from './user-rating-label';

export default class MovieOwnRating extends AbstractComponent {
  constructor(rating, onDataChange) {
    super();
    this._rating = rating;
    this.onDataChange = onDataChange;
    this._MAXRATING = 9;

    this._init();
  }

  _init() {
    for (let i = 1; i <= this._MAXRATING; i++) {
      const userRatingInput = new UserRatingInput(i, this._rating);
      const userRatingLabel = new UserRatingLabel(i, this.onDataChange);

      render(this.getElement(), userRatingInput.getElement(), Position.BEFOREEND);
      render(this.getElement(), userRatingLabel.getElement(), Position.BEFOREEND);
    }
  }

  getTemplate() {
    return `<div class="film-details__user-rating-score"></div>`;
  }
}
