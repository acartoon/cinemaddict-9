import MovieList from "../components/movie-list";
import {render, Position, getComments} from '../utils.js';
import BtnShowMore from "../components/btn-show-more";
import MovieContainer from "../components/movie-container";
import Sort from "../components/sort";
import MovieListController from "./movie-list-controller";

export default class MovieBoradController {
  constructor(container, onDataChange, filters) {
    this._container = container;
    this._movieData = [];
    this._commentsData = [];
    this._filters = filters;
    this._movieContainer = new MovieContainer();
    this._allFilmsList = new MovieList(false, `All movies. Upcoming`);
    this._topRatedFilmsList = new MovieList(true, `Top rated`);
    this._mostCommentedFilmsList = new MovieList(true, `Most commented`);
    this._sort = new Sort(this.onSortClick.bind(this));
    this._MAIN_BLOCK_LENGTH = 5;
    this._movieToRender = null;
    this._SIDE_BLOCK_LENGTH = 2;
    this._btnShowMore = new BtnShowMore(this._onBtnClick.bind(this));
    this.onDataChangeMain = onDataChange;

    this._init();
  }

  hidden() {
    this._sort.getElement().classList.add(`visually-hidden`);
    this._movieContainer.getElement().classList.add(`visually-hidden`);
  }

  show(movieData, commentsData) {
    if (movieData !== this._movieData) {
      this._movieData = movieData;
    }
    if (commentsData !== this._commentsData) {
      this._commentsData = commentsData;
    }
    
    this._setMovie(movieData, commentsData);
    this._sort.getElement().classList.remove(`visually-hidden`);
    this._movieContainer.getElement().classList.remove(`visually-hidden`);
  }

  _setMovie(movieData, commentsData) {
    this._movieData = movieData;
    this._commentsData = commentsData;

    this._renderBoard();
  }

  _init() {
    render(this._container, this._sort.getElement(), Position.BEFOREEND);
    render(this._container, this._movieContainer.getElement(), Position.BEFOREEND);
    
    render(this._movieContainer.getElement(), this._allFilmsList.getElement(), Position.BEFOREEND);
    render(this._movieContainer.getElement(), this._topRatedFilmsList.getElement(), Position.BEFOREEND);
    render(this._movieContainer.getElement(), this._mostCommentedFilmsList.getElement(), Position.BEFOREEND);

    this._renderBoard(this._movieData, this._commentsData);
  }
  
  _renderBoard() {
    const topRatedMovie = this._sortingMovieToRated(this._movieData, this._commentsData).slice(0, this._SIDE_BLOCK_LENGTH);
    const mostCommentedMovie = this._sortingMovieToComments(this._movieData, this._commentsData).slice(0, this._SIDE_BLOCK_LENGTH);
    this._movieToRender = (this._movieData.length < this._MAIN_BLOCK_LENGTH) ? this._movieData.length : this._MAIN_BLOCK_LENGTH;
    
    this._renderMovieList(this._allFilmsList, this._movieData.slice(0, this._movieToRender), this._commentsData);
    this._renderMovieList(this._topRatedFilmsList, topRatedMovie, this._commentsData);
    this._renderMovieList(this._mostCommentedFilmsList, mostCommentedMovie, this._commentsData);
    
    if (this._movieToRender <= this._movieData.length) {
      render(this._allFilmsList.getElement(), this._btnShowMore.getElement(), Position.BEFOREEND);
    }
  }

  onDataChange(newData, typeDataChange) {
    typeDataChange === `userState` ? this._movieData = newData : this._commentsData = newData;
    
    if(typeDataChange === `comment`) {
      this._rerenderMovieToComments(this._movieData, this._commentsData);
    }
    this.onDataChangeMain(newData, typeDataChange);
  }

  _renderMovieList(container, movieData, commentsData) {
    const movieListContainer = container.getElement().querySelector(`.films-list__container`);
    movieListContainer.innerHTML = ``;
    this._renderMovie(movieListContainer, movieData, commentsData);
  }

  _renderMovie(container, movieData, commentsData) {
    const movieListController = new MovieListController(container, movieData, commentsData, this.onDataChange.bind(this));
    movieListController.init()
  }
  _rerenderMovieToComments(movieData, commentsData) {
    const movieToRender = this._sortingMovieToComments(movieData, commentsData).slice(0, this._SIDE_BLOCK_LENGTH);
    const container = this._mostCommentedFilmsList.getElement().querySelector(`.films-list__container`);
    container.innerHTML = ``;
    this._renderMovie(container, movieToRender, commentsData);
  }

  _sortingMovieToComments(movieData, commentsData) {
    return movieData
    .map(i => ({
      ...i,
      commentsLength: getComments(commentsData, i.id).length
    }))
    .sort((a, b) => b.commentsLength - a.commentsLength)
    .map(item => {
      delete item.commentsLength
      return item
    })
  }

  _sortingMovieToRated(movieData) {
    return movieData.slice().sort((a, b) => b.rating - a.rating);
  }

  _onBtnClick(evt) {
    evt.preventDefault();
    const movieData = this._movieData.slice(0, this._movieToRender + this._MAIN_BLOCK_LENGTH);
    this._movieToRender += this._MAIN_BLOCK_LENGTH;

    const movieListContainer = this._allFilmsList.getElement().querySelector(`.films-list__container`);
    movieListContainer.innerHTML = ``;
    this._renderMovie(movieListContainer, movieData, this._commentsData);

    if (this._movieData.length <= this._movieToRender) {
      this._btnShowMore.getElement().classList.add(`visually-hidden`);
    }
  }

  onSortClick(sortType) {
    const container = this._allFilmsList.getElement().querySelector(`.films-list__container`);
    container.innerHTML = ``;

    const movieDataToRender = {
      'date': this._movieData.slice(0, this._movieToRender).sort((a, b) => a.releaseDate - b.releaseDate),
      'rating': this._sortingMovieToRated(this._movieData).slice(0, this._movieToRender),
      'default': this._movieData.slice(0, this._movieToRender),
    };

    movieDataToRender[sortType].forEach((movie) => this._renderMovie(container, movie, this._commentsData));
  }
}
