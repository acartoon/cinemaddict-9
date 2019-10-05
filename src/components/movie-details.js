import MovieBaseComponent from './movie-base-component.js';
import {render, unrender, Position} from '../utils.js';
import MovieCommentsComponent from './movie-comments-component.js';
import MovieDetailsBtnState from './movie-details-btn-state.js';
import MovieRating from './movie-rating.js';
import MovieOwnRating from './movie-own-rating.js';
import moment from 'moment';

export default class MovieDetails extends MovieBaseComponent {
  constructor(comments, data, onDataChange) {
    super(comments, data);
    this._movieCommentsComponent = [];
    this.onDataChange = onDataChange;
    this._movieDetailsBtnState = [];
    this._movieRating = new MovieRating(this._poster, this._name);
    this._movieOwnRating = null;

    this._init();
  }

  _init() {
    this._renderComments(this._comments);
    this._renderBtnState(this._watchlist, this._watched, this._favorite);
    if (this._watched) {
      this._renderMovieRating(this._ownrating);
    }
  }

  rerenderBtnState(watchlist, watched, favorite) {
    unrender(this._movieDetailsBtnState.getElement());
    this._movieDetailsBtnState.removeElement();
    this._renderBtnState(watchlist, watched, favorite);
    if (watched && !this.getElement().contains(this._movieRating.getElement())) {
      this._renderMovieRating();
    } else if (!watched) {
      this._unrenderMovieRating();
    }
  }
  
  rerenderOwnrating(ownrating) {
    unrender(this._movieOwnRating.getElement());
    this._movieOwnRating.removeElement();
    this._renderMovieOwnRating(ownrating);
  }

  rerenderComments(commentsData) {
    this._unrenderComments();
    this._renderComments(commentsData);
  }

  _renderMovieRating(ownrating) {
    this.getElement().querySelector(`.form-details__bottom-container`).before(this._movieRating.getElement());
    this._renderMovieOwnRating(ownrating);
  }

  _renderComments(commentsData) {
    this._movieCommentsComponent = new MovieCommentsComponent(commentsData, this.onDataChange);
    render(this.getElement().querySelector(`.form-details__bottom-container`), this._movieCommentsComponent.getElement(), Position.BEFOREEND);
  }
  
  _unrenderComments() {
    unrender(this._movieCommentsComponent.getElement());
    this._movieCommentsComponent.removeElement();
  }

  _renderMovieOwnRating(ownrating) {
    const container = this._movieRating.getElement().querySelector(`.film-details__user-rating-inner`);
    this._movieOwnRating = new MovieOwnRating(ownrating, this.onDataChange);
    render(container, this._movieOwnRating.getElement(), Position.BEFOREEND);
  }

  _unrenderMovieRating() {
    unrender(this._movieRating.getElement());
    this._movieRating.removeElement();
  }

  _renderBtnState(watchlist, watched, favorite) {
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
                  <td class="film-details__cell">${moment(this._releaseDate).format(`DD MMM YYYY`)}</td>
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

        <div class="form-details__bottom-container">
          
    </div>
  </form>
  </section>`;
  }
}
