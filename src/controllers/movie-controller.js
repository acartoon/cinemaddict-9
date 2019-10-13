import MovieDetails from '../components/movie-details.js';
import {render, unrender, Position} from '../utils.js';
import MovieCard from '../components/movie-card';
import {cloneDeep} from 'lodash';

export default class MovieController {
  constructor(movieData, commentsData, container, onDataChange, onChangeView) {
    this._container = container;
    this._movieData = movieData;
    this._onDataChange = onDataChange;
    this.onDataChange = this.onDataChange.bind(this);
    this._onChangeView = onChangeView;
    this._commentsData = commentsData;
    this._movieDetailsComponent = null;
    this._movieComponent = new MovieCard(this._commentsData, this._movieData, this.onDataChange);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._unrenderMovieDetails = this._unrenderMovieDetails.bind(this);
    this.setDefaultView = this.setDefaultView.bind(this);
  }

  init() {
    const openMovieDetails = [`.film-card__poster`, `.film-card__title`, `.film-card__comments`];
    openMovieDetails.forEach((i) => {
      this._movieComponent.getElement()
      .querySelector(i)
      .addEventListener(`click`, this._renderMovieDetails.bind(this));

    });
    render(this._container, this._movieComponent.getElement(), Position.BEFOREEND);
  }

  _initTmpData() {
    this._oldData = cloneDeep(this._movieData);
    this._newData = null;
  }

  _resetTmpData() {
    this._oldData = null;
    this._newData = null;
  }

  _renderMovieDetails() {
    this._onChangeView();
    this._movieDetailsComponent = new MovieDetails(this._commentsData, this._movieData, this.onDataChange);
    render(document.body, this._movieDetailsComponent.getElement(), Position.BEFOREEND);
    document.body.classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, this._onEscKeyDown);

    const commentInput = this._movieDetailsComponent.getElement()
      .querySelector(`.film-details__comment-input`);

    commentInput.addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    commentInput.addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._movieDetailsComponent.getElement()
      .querySelector(`.film-details__close-btn`)
        .addEventListener(`click`, this._unrenderMovieDetails);
  }

  _unrenderMovieDetails() {
    document.body.classList.remove(`hide-overflow`);
    unrender(this._movieDetailsComponent.getElement());
    this._movieDetailsComponent.removeElement();
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this._unrenderMovieDetails();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _onSendMsg(evt) {
    if (evt.key === `Enter` && (evt.ctrlKey || evt.metaKey)) {
      document.removeEventListener(`keydown`, this._onSendMsg);
    }
  }

  updateData(typeDataChange, commentsData) {
    this._commentsData = commentsData;
    const dataToChange = (typeDataChange === `comment`) ? this._commentsData : this._movieData;

    if (this._movieDetailsComponent) {
      this._movieDetailsComponent.updateData(typeDataChange, dataToChange);
    }

    this._movieComponent.updateData(typeDataChange, dataToChange);
  }

  onDataChange(dataType, dataChange = null) {
    this._initTmpData();

    if (dataType === `userState`) {
      if (dataChange === `watchlist`) {
        this._movieData.watchlist = !this._movieData.watchlist;
      } else if (dataChange === `watched`) {
        this._movieData.watched = !this._movieData.watched;
        this._movieData.ownrating = null;
      } else if (dataChange === `favorite`) {
        this._movieData.favorite = !this._movieData.favorite;
      }
      this._newData = this._movieData;
    } else if (dataType === `ownrating`) {
      this._movieData.ownrating = dataChange;
      this._newData = this._movieData;
    } else if (dataType === `comment`) {
      this._newData = dataChange;
    }
    this._onDataChange(this._newData, this._oldData, this, dataType);
    this._resetTmpData();
  }

  setDefaultView() {
    if (this._movieDetailsComponent) {
      unrender(this._movieDetailsComponent.getElement());
      this._movieDetailsComponent.removeElement();
    }
  }
}
