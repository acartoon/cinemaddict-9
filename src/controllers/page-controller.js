import MovieList from "../components/movie-list";
import {render, unrender, Position, getComments} from '../utils.js';
import Movie from '../components/movie';
import MovieDetails from '../components/movie-details.js';
import BtnShowMore from "../components/btn-show-more";
import MovieContainer from "../components/movie-container";
import Sort from "../components/sort";

export default class PageController {
  constructor(container, movieData, commentsData) {
    this._container = container;
    this._movieData = movieData;
    this._commentsData = commentsData;
    this._allFilmsList = new MovieList(false, `All movies. Upcoming`);
    this._topRatedFilmsList = new MovieList(true, `Top rated`);
    this._mostCommentedFilmsList = new MovieList(true, `Most commented`);
    this._movieContainer = new MovieContainer();
    this._sort = new Sort(this.onSortClick.bind(this));
    this._MAIN_BLOCK_LENGTH = 5;
    this._movieToRender = null;
    this._SIDE_BLOCK_LENGTH = 2;
    this._btnShowMore = new BtnShowMore(this._onBtnClick.bind(this));
  }

  init() {
    render(this._container.querySelector(`.main`), this._sort.getElement(), Position.BEFOREEND);
    render(this._container.querySelector(`.main`), this._movieContainer.getElement(), Position.BEFOREEND);

    this._movieToRender = (this._movieData.length < this._MAIN_BLOCK_LENGTH) ? this._movieData.length : this._MAIN_BLOCK_LENGTH;
    this._renderMovieList(this._allFilmsList, this._movieData.slice(0, this._movieToRender));
    this._renderMovieList(this._topRatedFilmsList, this._sortingMovieToRated().slice(0, this._SIDE_BLOCK_LENGTH));
    this._renderMovieList(this._mostCommentedFilmsList, this._sortingMovieToComments().slice(0, this._SIDE_BLOCK_LENGTH));
    render(this._allFilmsList.getElement(), this._btnShowMore.getElement(), Position.BEFOREEND);
  }

  _renderMovieBoard(movieData, container) {
    movieData.forEach((i) => this._renderMovie(i, getComments(this._commentsData, i.id), container));
  }

  _sortingMovieToComments() {
    return this._movieData
    .map(i => ({
      ...i,
      commentsLength: getComments(this._commentsData, i.id).length
    }))
    .sort((a, b) => b.commentsLength - a.commentsLength)
    .map(item => {
      delete item.commentsLength;
      return item;
    })
  }

  _sortingMovieToRated() {
    return this._movieData.slice().sort((a, b) => b.rating - a.rating);
  }

  _renderMovieList(movieList, movieData) {
    render(this._movieContainer.getElement(), movieList.getElement(), Position.BEFOREEND);
    const container = movieList.getElement().querySelector(`.films-list__container`);
    this._renderMovieBoard(movieData, container);
  }

  _renderMovie(movieData, commentsData, container) {
    const movieComponent = new Movie(commentsData, movieData);
    const movieDetailsComponent = new MovieDetails(commentsData, movieData);
    const openMovieDetails = [`.film-card__poster`, `.film-card__title`, `.film-card__comments`];

    const renderMovieDetails = () => {
      const onEscKeyDown = (evt) => {
        if (evt.key === `Escape` || evt.key === `Esc`) {
          unrenderMovieDetails();
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      };
      
      const unrenderMovieDetails = () => {
        commentInput.removeEventListener(`focus`,  onFocusInput);
        commentInput.removeEventListener(`blur`, onBlurInput);
        closeBtn.removeEventListener(`click`, unrenderMovieDetails);
        unrender(movieDetailsComponent.getElement());
        movieDetailsComponent.removeElement();
      };

      const commentInput = movieDetailsComponent.getElement()
        .querySelector(`.film-details__comment-input`);

      const closeBtn = movieDetailsComponent.getElement()
        .querySelector(`.film-details__close-btn`);

      render(this._container, movieDetailsComponent.getElement(), Position.BEFOREEND);
      document.addEventListener(`keydown`, onEscKeyDown);

      const onFocusInput = () => document.removeEventListener(`keydown`, onEscKeyDown);
      const onBlurInput = () => document.addEventListener(`keydown`, onEscKeyDown);

      commentInput.addEventListener(`focus`,  onFocusInput);
      commentInput.addEventListener(`blur`, onBlurInput);
      closeBtn.addEventListener(`click`, unrenderMovieDetails);
    };

    openMovieDetails.forEach((i) => {
      movieComponent.getElement()
      .querySelector(i)
      .addEventListener(`click`, renderMovieDetails);
    });

    render(container, movieComponent.getElement(), Position.BEFOREEND);
  }

  _onBtnClick(evt) {
    evt.preventDefault();
    const movieData = this._movieData.slice(this._movieToRender, this._movieToRender + this._MAIN_BLOCK_LENGTH);
    this._movieToRender += this._MAIN_BLOCK_LENGTH;

    this._renderMovieBoard(movieData, this._allFilmsList.getElement().querySelector(`.films-list__container`));

    if (this._movieData.length <= this._movieToRender) {
      this._btnShowMore.getElement().classList.add(`visually-hidden`);
    }
  }

  onSortClick(sortType) {
    const container = this._allFilmsList.getElement().querySelector(`.films-list__container`);
    container.innerHTML = ``;

    const movieDataToRender = {
      'date': this._movieData.slice(0, this._movieToRender).sort((a, b) => a.releaseDate - b.releaseDate),
      'rating': this._sortingMovieToRated().slice(0, this._movieToRender),
      'default': this._movieData.slice(0, this._movieToRender),
    };
    this._renderMovieBoard(movieDataToRender[sortType], container);
  }
}