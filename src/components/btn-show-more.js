import {AbstractComponent} from './abstract-component.js';

export class BtnShowMore extends AbstractComponent {
  constructor(onBtnClick) {
    super();
    this._onBtnClick = onBtnClick;

   this._onClick();
  }
  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }

  _onClick() {
    this.getElement().addEventListener(`click`, this._onBtnClick)
  }
}
