import MovieBaseComponent from './movie-base-component.js';
import {render, unrender, Position, render2} from '../utils.js';
import MovieCommentsComponent from './movie-comments-component.js';
import BtnState from './btn-state.js';


export default class MovieDetails extends MovieBaseComponent {
  constructor(comments, data) {
    super(comments, data);
    this._movieCommentsComponent = new MovieCommentsComponent(this._comments);
  }

  init() {
    render(this.getElement().querySelector(`.form-details__bottom-container`), this._movieCommentsComponent.getElement(), Position.BEFOREEND);
    const container = this.getElement().querySelector(`.film-details__controls`);
    const btnDatat = [
      {stateData: this._watchlist, name: `watchlist`, label: `Add to watchlist`},
      {stateData: this._watched, name: `watched`, label: `Already watched`},
      {stateData: this._favorite, name: `favorite`, label: `Add to favorites`},
    ]

    btnDatat.forEach((i) => {
      const btnState = new BtnState(i);
      render2(container, btnState.getTest());
    });
  }

  _renderBtn() {
    const container = this.getElement().querySelector(`.film-details__controls`);
    const btn = [
      {stateData: this._watchlist, name: `watchlist`, label: `Add to watchlist`},
      {stateData: this._watched, name: `watched`, label: `Already watched`},
      {stateData: this._favorite, name: `favorite`, label: `Add to favorites`},
    ]

    btn.forEach((i) => {
      const btnState = new BtnState(i);
      render2(container, btnState.getTest());
    });
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
          <section class="film-details__controls">
          </section>
        </div>
        <div class="form-details__bottom-container">
          
    </div>
  </form>
  </section>`;
  }
}
