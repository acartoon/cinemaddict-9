import NewComment from "../components/commentsMovie/new-comment.js";
import MovieCommentsContainer from "../components/commentsMovie/movie-comments-container.js";
import {render, Position, unrender, getRandomInteger, getRandomString, namesPeople} from "../utils.js";
import MovieCommentsTitle from "../components/commentsMovie/movie-comments-title.js";
import CommentsList from "../components/commentsMovie/comments-list.js";
import CommentComponent from "../components/commentsMovie/comment-component.js";
export default class CommentsMovieController {
  constructor(commentsData, onDataChange, idFilm) {
    this._container = null;
    this._idFilm = idFilm;
    this._commentsData = commentsData;
    this.onDataChange = onDataChange;
    this._newComment = new NewComment(this.toAddComment.bind(this));
    this._movieCommentsContainer = new MovieCommentsContainer();
    this._movieCommentsTitle = null;
    this._cont = null;
    this._commentsList = new CommentsList();
  }

  init(container) {
    this._container = container;
    this._render();
  }
  _getComment(emoji, comment) {
    return {
      id: getRandomString(3),
      idFilm: this._idFilm,
      comment,
      author: Array.from(namesPeople)[getRandomInteger(Array.from(namesPeople).length - 1)],
      date: new Date(),
      emotion: emoji,
    };
  }
  _render() {
    this._cont = this._movieCommentsContainer.getElement();
    render(this._container, this._cont, Position.BEFOREEND);
    this._renderComments(this._commentsData);
    render(this._cont, this._newComment.getElement(), Position.BEFOREEND);
  }

  _renderComments(commentsData) {
    this._movieCommentsTitle = new MovieCommentsTitle(commentsData.length);
    render(this._cont, this._movieCommentsTitle.getElement(), Position.AFTERBEGIN);
    this._cont.prepend(this._movieCommentsTitle.getElement());

    if (commentsData.length > 0) {
      this._movieCommentsTitle.getElement().after(this._commentsList.getElement());
      commentsData.forEach((comment) => {
        const commentItem = new CommentComponent(comment, this.onDataChange);
        render(this._commentsList.getElement(), commentItem.getElement());
      });
    }
  }

  _unrenderComments() {
    unrender(this._movieCommentsTitle.getElement());
    this._movieCommentsTitle.removeElement();

    unrender(this._commentsList.getElement());
    this._commentsList.removeElement();
  }

  update(commentsData) {
    this._unrenderComments();
    this._renderComments(commentsData);
  }

  toAddComment(evt) {
    if (evt.key === `Enter` && (evt.ctrlKey || evt.metaKey)) {
      const comment = this._newComment.getElement().querySelector(`.film-details__comment-input`);
      const emoji = this._newComment.getElement().querySelector(`img`) ?
        this._newComment.getElement().querySelector(`img`).getAttribute(`alt`) : `smile`;
      const newComment = this._getComment(emoji, comment.value);
      this.onDataChange(`comment`, newComment);
      comment.value = ``;
      this._newComment.getElement().querySelector(`.film-details__add-emoji-label`).innerHTML = ``;
    }
  }
}
