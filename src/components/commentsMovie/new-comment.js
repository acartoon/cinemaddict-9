import AbstractComponent from '../abstract-component.js';
import {emojis, render, Position} from '../../utils.js';
import EmojiInput from './emoji-input.js';
import EmojiLabel from './emoji-label.js';

export default class NewComment extends AbstractComponent {
  constructor() {
    super();
    this.onChangeEmotion = this.onChangeEmotion.bind(this);
    this._init();
  }

  _init() {
    const container = this.getElement().querySelector(`.film-details__emoji-list`);
    emojis.forEach((i) => {
      const emojiLabel = new EmojiLabel(i, this.onChangeEmotion);
      const emojiInput = new EmojiInput(i);
      render(container, emojiLabel.getElement(), Position.BEFOREEND);
      render(container, emojiInput.getElement(), Position.BEFOREEND);
    });
  }

  onChangeEmotion(emotion) {
    const container = this.getElement().querySelector(`.film-details__add-emoji-label`);
    container.innerHTML = `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="${emotion}">`;
  }

  test() {
    const input = this.getElement().addEventListener(`film-details__comment-label`);

    input.addEventListener(``)
  }

  getTemplate() {
    return `<div class="film-details__new-comment">
    <div for="add-emoji" class="film-details__add-emoji-label"></div>
  
    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
    </label>
  
    <div class="film-details__emoji-list">
      
    </div>
  </div>`;
  }
}
