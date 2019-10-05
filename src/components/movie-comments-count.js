import AbstractComponent from './abstract-component.js';

export default class MovieCommentsCount extends AbstractComponent {
  constructor(commentslength) {
    super();
    this._commentslength = commentslength;

  }
  getTemplate() {
    return `<a class="film-card__comments">${this._commentslength} comments</a>`;
  }
}
