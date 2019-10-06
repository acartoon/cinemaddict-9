import MovieDetails from '../components/movie-details.js';
import {render, unrender, Position} from '../utils.js';
import Movie from '../components/movie';
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
    this._movieComponent = new Movie(this._commentsData, this._movieData, this.onDataChange);
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
    this._tmpData = cloneDeep(this._movieData);
  }

  _resetTmpData() {
    this._tmpData = null;
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
    if (evt.key == `Enter` && (evt.ctrlKey || evt.metaKey)) {
      document.removeEventListener(`keydown`, this._onSendMsg);
    }
  }

  rerender(typeDataChange, commentsData = null) {
    // this._movieDetailsComponent.rerenderData(typeDataChange, commentsData);
    if (typeDataChange === `userState`) {
      if (this._movieDetailsComponent) {
        this._movieDetailsComponent.rerenderBtnState(this._movieData.watchlist, this._movieData.watched, this._movieData.favorite);
      }
      this._movieComponent.rerenderBtnState(this._movieData.watchlist, this._movieData.watched, this._movieData.favorite);
    } else if (typeDataChange === `commentDelete`) {
      console.log(commentsData)
      this._commentsData = commentsData;
      this._movieDetailsComponent.rerenderComments(this._commentsData);
      this._movieComponent.rerenderCommentsCount(this._commentsData.length);
    } else if(typeDataChange === `ownrating`) {
      this._movieDetailsComponent.rerenderOwnrating(this._movieData.ownrating);
    } 
  }

  onDataChange(dataType, dataChange = null) {
    this._initTmpData();
    if (dataType === `userState` && dataChange === `watchlist`) {
      this._movieData.watchlist = !this._tmpData.watchlist;
    } else if (dataType === `userState` && dataChange === `watched`) {
      this._movieData.watched = !this._tmpData.watched;
      this._movieData.ownrating = null;
    } else if (dataType === `userState` && dataChange === `favorite`) {
      this._movieData.favorite = !this._tmpData.favorite;
    } else if (dataType === `ownrating`) {
      this._movieData.ownrating = dataChange;
    } else if (dataType === `commentDelete`) {
      this._tmpData = dataChange; //id комментария
    }

    this._onDataChange(this._movieData, this._tmpData, this, dataType);
    this._resetTmpData();
  }

  setDefaultView() {
    if (this._movieDetailsComponent) {
      unrender(this._movieDetailsComponent.getElement());
      this._movieDetailsComponent.removeElement();
    }
  }
}
