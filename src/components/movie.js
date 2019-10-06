import MovieBaseComponent from './movie-base-component.js';
import MovieBtnState from './movie-btn-state.js';
import {render, unrender} from '../utils.js';
import moment from 'moment';
import MovieCommentsCount from './movie-comments-count';

export default class Movie extends MovieBaseComponent {
  constructor(comments, data, onDataChange) {
    super(comments, data);
    this._onDataChange = onDataChange;
    this._movieCommentsCount = null;

    this._init();
  }

  _init() {
    this._renderBtnState(this._watchlist, this._watched, this._favorite);
    this.renderCommentsCount(this._comments.length);
  }

  renderCommentsCount(commentsCount) {
    this._movieCommentsCount = new MovieCommentsCount(commentsCount);
    this.getElement().querySelector(`.film-card__controls`).before(this._movieCommentsCount.getElement())
  }

  rerenderCommentsCount(commentsCount) {
    unrender(this._movieCommentsCount.getElement());
    this._movieCommentsCount.removeElement();
    this.renderCommentsCount(commentsCount);
  }

  rerenderBtnState(watchlist, watched, favorite) {
    this.getElement().querySelector(`.film-card__controls`).innerHTML = ``;
    this._renderBtnState(watchlist, watched, favorite);
  }

  _renderBtnState(watchlist, watched, favorite) {
    const btnData = [
      {state: `watchlist`, classBtn: `add-to-watchlist`, data: watchlist, title: `Add to watchlist`},
      {state: `watched`, classBtn: `mark-as-watched`, data: watched, title: `Mark as watched`},
      {state: `favorite`, classBtn: `favorite`, data: favorite, title: `Mark as favorite`},
    ];

    btnData.forEach((i) => {
      const btn = new MovieBtnState(i, this._onDataChange);
      render(this.getElement().querySelector(`.film-card__controls`), btn.getElement());
    });
  }

  getTemplate() {
    return `<article class="film-card">
    <h3 class="film-card__title">${this._name}</h3>
    <p class="film-card__rating">${this._rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${moment(this._releaseDate).format(`YYYY`)}</span>
      <span class="film-card__duration">${this._runtime}</span>
      <span class="film-card__genre">${this._genres[0]}</span>
    </p>
    <img src="${this._poster}" alt="" class="film-card__poster">
    <p class="film-card__description">$${this._description.length < 140 ? this._description : `${this._description.slice(0, 139).trim()}…`}</p>
    <form class="film-card__controls"></form>
    </article>`;
  }
}
