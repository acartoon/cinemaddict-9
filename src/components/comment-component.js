import AbstractComponent from './abstract-component.js';

export default class CommentComponent extends AbstractComponent {
  constructor({id, idFilm, emotion, comment, author, date}, onDataChange) {
    super();
    this._id = id;
    this._emotion = emotion;
    this._idFilm = idFilm;
    this._comment = comment;
    this._author = author;
    this._date = date;
    this._onDataChange = onDataChange;

    this._onClick();
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

  _onClick() {
    const deleteDtn = this.getElement().querySelector(`.film-details__comment-delete`);
    deleteDtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._onDataChange(`commentDelete`, this._id);
    })
  }
}
