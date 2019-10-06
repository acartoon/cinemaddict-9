import AbstractComponent from './abstract-component';

export default class MovieRating extends AbstractComponent {
  constructor(poster, name) {
    super();
    this._poster = poster;
    this._name = name;
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
