import AbstractComponent from './abstract-component.js';

export default class MovieDetailsBtnState extends AbstractComponent {
  constructor(watchlist, watched, favorite, onDataChange) {
    super();
    this._watchlist = watchlist;
    this._watched = watched;
    this._favorite = favorite;
    this._favorite = favorite;
    this._onDataChange = onDataChange;

    this._onClick();
  }

  getTemplate() {
    return `<section class="film-details__controls">
    <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._watchlist ? `checked` : ``}>
    <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
    
    <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._watched ? `checked` : ``}>
    <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
    
    <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._favorite ? `checked` : ``}>
    <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
    </section>`;
  }

  _onClick() {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.hasAttribute(`for`)) {
        this._onDataChange(`userState`, evt.target.getAttribute(`for`));
      }
    });
  }
}
