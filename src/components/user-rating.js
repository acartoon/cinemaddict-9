import AbstractComponent from './abstract-component.js';

export default class UserRating extends AbstractComponent {
  constructor(state, classBtn, data, title, onDataChange) {
    super();
    this._state = state
    this._classBtn = classBtn;
    this._data = data; 
    this._title = title; 
    this._onDataChange = onDataChange;
    this._maxRating = 10;
    this._init();
  }

  _init() {
    for(let i = 1; i <= this._maxRating; i++) {
      const userRatingInput = new UserRatingInput(i, this._data)
      const userRatingLabel = new UserRatingLabel(i, this._onDataChange)

      render(this.getElement(), userRatingInput.getElement())
      render(this.getElement(), userRatingLabel.getElement())
    }
  }

  getTemplate() {
    return `<div class="film-details__user-rating-score">
    </div>`;
  }

  _onClick() {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault()
        this._onDataChange(this._state)
    })
  }
}
