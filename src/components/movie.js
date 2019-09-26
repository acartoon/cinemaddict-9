import {createElement} from '../utils.js';

export default class Movie {
  constructor({name, genres, rating, runtime, description, watchlist, watched, favorite, releaseDate, poster}, comments) {
    this._name = name;
    this._genres = genres;
    this._rating = rating;
    this._runtime = runtime;
    this._description = description;
    this._watchlist = watchlist;
    this._watched = watched;
    this._favorite = favorite;
    this._releaseDate = releaseDate;
    this._poster = poster;
    this._comments = comments;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    if (!this._element) {
      this._element = null;
    }
    return this._element;
  }

  getTemplate() {
    return `<article class="film-card">
    <h3 class="film-card__title">${this._name}</h3>
    <p class="film-card__rating">${this._rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${this._releaseDate.getFullYear()}</span>
      <span class="film-card__duration">${this._runtime}</span>
      <span class="film-card__genre">${this._genres[0]}</span>
    </p>
    <img src="${this._poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${this._description}</p>
    <a class="film-card__comments">${this._comments.length} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._watchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._watched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${this._favorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
    </form>
  </article>`.trim();
  }
}
