import MovieBaseComponent from './movie-base-component.js';
import {render, unrender, Position} from '../utils.js';
import MovieCommentsComponent from './movie-comments-component.js';
import MovieDetailsBtnState from './movie-details-btn-state.js';
import MovieRating from './movie-rating.js';


export default class MovieDetails extends MovieBaseComponent {
  constructor(comments, data, onDataChange) {
    super(comments, data);
    this._movieCommentsComponent = new MovieCommentsComponent(this._comments);
    this.onDataChange = onDataChange;
    this._movieDetailsBtnState = [];
    this._movieRating = null;
    this._init();
  }
  
  _init() {
    render(this.getElement().querySelector(`.form-details__bottom-container`), this._movieCommentsComponent.getElement(), Position.BEFOREEND);
    this._render(this._watchlist, this._watched, this._favorite);
    if(this._watched) {
      this._renderRating();
    }
  }

  _renderRating() {
    const container = this.getElement().querySelector(`.form-details__middle-container`);
    this._movieRating = new MovieRating(this._poster, this._name, this._rating, this.onDataChange)
    render(container, this._movieRating.getElement())
  }
  
  _unrenderRating() {
    unrender(this._movieRating.getElement());
    this._movieRating.removeElement();
  }

  rerenderBtnState(watchlist, watched, favorite) {
    unrender(this._movieDetailsBtnState.getElement())
    this._movieDetailsBtnState.removeElement();
    this._render(watchlist, watched, favorite);

    watched ? this._renderRating() : this._unrenderRating();
  }

  _render(watchlist, watched, favorite) {
    const container = this.getElement().querySelector(`.form-details__top-container`);
    this._movieDetailsBtnState = new MovieDetailsBtnState(watchlist, watched, favorite, this.onDataChange);
    render(container, this._movieDetailsBtnState.getElement());
  }
  
  getTemplate() {
    return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${this._poster}" alt="${this._poster}">
    
              <p class="film-details__age">${this._age}</p>
            </div>
    
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${this._name}</h3>
                  <p class="film-details__title-original">Original: ${this._originalName}</p>
                </div>
    
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${this._rating}</p>
                </div>
              </div>
    
              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${this._director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${this._writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${this._actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${new Date(this._releaseDate).toDateString()}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${this._runtime}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${this._country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${this._genres.length > 1 ? `Genres` : `Genre`}</td>
                  <td class="film-details__cell">
                  ${this._genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(``)}
                </tr>
              </table>
    
              <p class="film-details__film-description">
                ${this._description}
              </p>
            </div>
          </div>
        </div>
        <div class="form-details__middle-container">
        </div>
        <div class="form-details__bottom-container">
          
    </div>
  </form>
  </section>`;
  }
}
