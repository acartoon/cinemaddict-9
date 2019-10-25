import MovieBaseComponent from './movie-base-component.js';
import {unrender} from '../utils.js';
import MovieDetailsBtnState from './movie-details-btn-state.js';
import MovieRating from './movie-rating.js';
import moment from 'moment';
import CommentsMovieController from '../controllers/comments-movie-controller.js';

export default class MovieDetails extends MovieBaseComponent {
  constructor(comments, data, onDataChange) {
    super(comments, data);
    this._movieCommentsComponent = [];
    this.onDataChange = onDataChange;
    this._movieDetailsBtnState = new MovieDetailsBtnState(this._watchlist, this._watched, this._favorite, this.onDataChange);
    this._movieRating = null;
    this._commentsMovieController = new CommentsMovieController(this._comments, this.onDataChange, this._id);

    this._init();
  }

  _init() {
    this._movieDetailsBtnState.init(this.getElement().querySelector(`.form-details__top-container`));
    this._renderMovieRating(this._watched, this._ownrating);
    this._commentsMovieController.init(this.getElement().querySelector(`.form-details__bottom-container`));
  }

  _renderMovieRating(watched, ownrating) {
    if (watched && !this._movieRating) {
      this._movieRating = new MovieRating(this._poster, this._name, ownrating, this.onDataChange);
      this.getElement().querySelector(`.form-details__bottom-container`).before(this._movieRating.getElement());
    } else if (!watched && this._movieRating) {
      this._unrenderMovieRating();
    }
  }

  _unrenderMovieRating() {
    unrender(this._movieRating.getElement());
    this._movieRating.removeElement();
    this._movieRating = null;
  }

  updateData(typeDataChange, dataToChange) {
    if (typeDataChange === `userState`) {
      const {watched, watchlist, favorite, ownrating} = dataToChange;
      this._movieDetailsBtnState.update(watchlist, watched, favorite);
      this._renderMovieRating(watched, ownrating);
    } else if (typeDataChange === `ownrating`) {
      let {ownrating} = dataToChange;
      this._movieRating.update(ownrating);
    } else if (typeDataChange === `comment`) {
      this._commentsMovieController.update(dataToChange);
    }
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
