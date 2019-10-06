import AbstractComponent from './abstract-component.js';
import { render, Position } from '../utils.js';
import MovieBtnStateInput from './movie-btn-state-input.js';
import MovieBtnStateLabel from './movie-btn-state-label.js';

export default class MovieDetailsBtnState extends AbstractComponent {
  constructor(watchlist, watched, favorite, onDataChange) {
    super();
    this._watchlist = watchlist;
    this._watched = watched;
    this._favorite = favorite;
    this.onDataChange = onDataChange;
  }

  init(container) {
    render(container, this.getElement(), Position.BEFOREEND);
    this._renderBtn(this._watchlist, this._watched, this._favorite);
  }
  
  _renderBtn(watchlist, watched, favorite) {
    const BtnState = [
      {data: watchlist, name: `watchlist`, label: `Add to watchlist`},
      {data: watched, name: `watched`, label: `Already watched`},
      {data: favorite, name: `favorite`, label: `Add to favorites`},
    ]
  
    BtnState.forEach((btn) => {
      const movieBtnStateInput = new MovieBtnStateInput(btn);
      const movieBtnStateLabel = new MovieBtnStateLabel(btn, this.onDataChange);
      render(this.getElement(), movieBtnStateInput.getElement(), Position.BEFOREEND);
      render(this.getElement(), movieBtnStateLabel.getElement(), Position.BEFOREEND);      
    })
  }

  update(watchlist, watched, favorite) {
    this.getElement().innerHTML = ``;
    this._renderBtn(watchlist, watched, favorite);
  }

  getTemplate() {
    return `<section class="film-details__controls">
    </section>`;
  }
}
