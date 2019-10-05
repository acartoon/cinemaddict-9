import AbstractComponent from './abstract-component.js';
import CommentComponent from './comment-component.js';
import {render, Position} from '../utils.js';
import NewComment from './new-comment.js';
import CommentsList from './comments-list.js';


export default class MovieCommentsComponent extends AbstractComponent {
  constructor(commentsData, onDataChange) {
    super();
    this.onDataChange = onDataChange;
    this._commentsData = commentsData;
    this._commentsList = new CommentsList();
    this._newComment = new NewComment();
    this._init();
  }

  _init() {
    if (this._commentsData.length >= 0) {
      render(this.getElement(), this._commentsList.getElement(), Position.BEFOREEND);
      this._commentsData.forEach((i) => this._renderComments(i, this._commentsList.getElement()));
      render(this.getElement(), this._newComment.getElement(), Position.BEFOREEND);
    }
  }

  _renderComments(commentData, container) {
    const commentComponent = new CommentComponent(commentData, this.onDataChange);
    render(container, commentComponent.getElement(), Position.BEFOREEND);
  }

  getTemplate() {
    return `<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._commentsData.length}</span></h3>
    </section>`;
  }
}
