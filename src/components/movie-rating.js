import AbstractComponent from './abstract-component';
import {unrender, render, Position} from '../utils';
import MovieOwnRating from './movie-own-rating';

export default class MovieRating extends AbstractComponent {
  constructor(poster, name, ownrating, onDataChange) {
    super();
    this._poster = poster;
    this._name = name;
    this._ownrating = ownrating;
    this._movieOwnRating = null;
    this.onDataChange = onDataChange;

    this._init();
  }

  _init() {
    this._renderRating(this._ownrating);
  }
  _renderRating(ownrating) {
    this._movieOwnRating = new MovieOwnRating(ownrating, this.onDataChange);
    render(this.getElement().querySelector(`.film-details__user-rating-inner`), this._movieOwnRating.getElement(), Position.BEFOREEND);
  }

  _unrenderRating() {
    unrender(this._movieOwnRating.getElement());
    this._movieOwnRating.removeElement();
  }

  update(ownrating) {
    this._unrenderRating();
    this._renderRating(ownrating);
  }

  getTemplate() {
    return `<div class="form-details__middle-container">
   <section class="film-details__user-rating-wrap">
    <div class="film-details__user-rating-controls">
      <button class="film-details__watched-reset" type="button">Undo</button>
    </div>

    <div class="film-details__user-score">
      <div class="film-details__user-rating-poster">
        <img src="${this._poster}" alt="film-poster" class="film-details__user-rating-img">
      </div>

      <section class="film-details__user-rating-inner">
        <h3 class="film-details__user-rating-title">${this._name}</h3>

        <p class="film-details__user-rating-feelings">How you feel it?</p>
        
      </section>
    </div>
  </section></div>`;
  }
}
