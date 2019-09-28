import AbstractComponent from './abstract-component.js';

export default class CommentComponent extends AbstractComponent {
  constructor({id, idFilm, emotion, comment, author, date}) {
    super();
    this._id = id;
    this._emotion = emotion;
    this._idFilm = idFilm;
    this._comment = comment;
    this._author = author;
    this._date = date;
  }

  getTemplate() {
    return `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
      <img src="./images/emoji/${this._emotion}.png" width="55" height="55" alt="emoji">
      </span>
      <div>
      <p class="film-details__comment-text">${this._comment}</p>
      <p class="film-details__comment-info">
      <span class="film-details__comment-author">${this._author}</span>
      <span class="film-details__comment-day">${this._date}</span>
      <button class="film-details__comment-delete">Delete</button>
      </p>
      </div>
      </li>`;
  }
}