import NewComment from "../components/commentsMovie/new-comment.js";
import MovieCommentsContainer from "../components/commentsMovie/movie-comments-container.js";
import { render, Position, unrender } from "../utils.js";
import MovieCommentsTitle from "../components/commentsMovie/movie-comments-title.js";
import CommentsList from "../components/commentsMovie/comments-list.js";
import CommentComponent from "../components/commentsMovie/comment-component.js";
export default class CommentsMovieController {
  constructor(commentsData, onDataChange, onCloseMovieDetail, onClickemotion) {
    this._container = null;
    this._commentsData = commentsData;
    this.onDataChange = onDataChange;
    this._onCloseMovieDetail = onCloseMovieDetail;
    this._onClickemotion = onClickemotion;
    this._newComment = new NewComment();
    this._movieCommentsContainer = new MovieCommentsContainer();
    this._movieCommentsTitle = null;
    this._cont = null;
    this._commentsList = new CommentsList();
  }

  init(container) {
    this._container = container;
    this._render();
  }

  _render() {
    this._cont = this._movieCommentsContainer.getElement();
    render(this._container, this._cont, Position.BEFOREEND);
    this._renderComments(this._commentsData);
    render(this._cont, this._newComment.getElement(), Position.BEFOREEND)
  }
  
  _renderComments(commentsData) {
    this._movieCommentsTitle = new MovieCommentsTitle(commentsData.length);
    render(this._cont, this._movieCommentsTitle.getElement(), Position.AFTERBEGIN);
    this._cont.prepend(this._movieCommentsTitle.getElement());

    if(commentsData.length > 0) {
      this._movieCommentsTitle.getElement().after(this._commentsList.getElement());
      commentsData.forEach((comment) => {
        const commentItem = new CommentComponent(comment, this.onDataChange);
        render(this._commentsList.getElement(), commentItem.getElement());
      })
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
}