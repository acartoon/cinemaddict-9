import AbstractComponent from './abstract-component.js';
import CommentComponent from './comment-component.js';
import { render, Position } from '../utils.js';


export default class MovieCommentsComponent extends AbstractComponent {
  constructor(commentsData) {
    super();
    this._commentsData = commentsData;
    this._commentComponent = new CommentComponent(this._commentsData);
    this._init();
  }

  _init() {
    this._commentsData.forEach((i) => this._renderComments(i))
  }

  _renderComments(data) {
    const commentComponent = new CommentComponent(data);
    render(this.getElement().querySelector(`.film-details__comments-list`), commentComponent.getElement(), Position.BEFOREEND)
  }

  getTemplate() {
    return `<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._commentsData.length}</span></h3>

    <ul class="film-details__comments-list">
  </ul>
<div class="film-details__new-comment">
  <div for="add-emoji" class="film-details__add-emoji-label"></div>

  <label class="film-details__comment-label">
    <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
  </label>

  <div class="film-details__emoji-list">
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
    <label class="film-details__emoji-label" for="emoji-smile">
      <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
    </label>

    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
    <label class="film-details__emoji-label" for="emoji-sleeping">
      <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
    </label>

    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
    <label class="film-details__emoji-label" for="emoji-gpuke">
      <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
    </label>

    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
    <label class="film-details__emoji-label" for="emoji-angry">
      <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
    </label>
  </div>
</div>
</section>`;
  }
}




