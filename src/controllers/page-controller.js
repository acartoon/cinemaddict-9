import MovieList from "../components/movie-list";
import {render, Position, getComments} from '../utils.js';
import BtnShowMore from "../components/btn-show-more";
import MovieContainer from "../components/movie-container";
import Sort from "../components/sort";
import MovieController from "./movie-controller";

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
    this.onDataChange = this.onDataChange.bind(this);
    this.onChangeView = this.onChangeView.bind(this);
    this._subscriptions = [];
  }

  init() {
    this._movieToRender = (this._movieData.length < this._MAIN_BLOCK_LENGTH) ? this._movieData.length : this._MAIN_BLOCK_LENGTH;
    render(this._container, this._sort.getElement(), Position.BEFOREEND);
    render(this._container, this._movieContainer.getElement(), Position.BEFOREEND);

    this._renderMovieList(this._allFilmsList, this._movieData.slice(0, this._movieToRender));
    this._renderMovieList(this._topRatedFilmsList, this._sortingMovieToRated(this._movieData).slice(0, this._SIDE_BLOCK_LENGTH));
    this._renderMovieList(this._mostCommentedFilmsList, this._sortingMovieToComments(this._movieData, this._commentsData).slice(0, this._SIDE_BLOCK_LENGTH));

    if (this._movieToRender <= this._movieData.length) {
      render(this._allFilmsList.getElement(), this._btnShowMore.getElement(), Position.BEFOREEND);
    }
  }
  onDataChange(newData, oldData, el, typeDataChange) {
    const index = this._movieData.findIndex((i) => i.id === oldData.id);
    this._movieData[index] = newData;
    el.rerender(typeDataChange);
  }
  _renderMovieList(movieList, data) {
    render(this._movieContainer.getElement(), movieList.getElement(), Position.BEFOREEND);
    const container = movieList.getElement().querySelector(`.films-list__container`);

    data.forEach((i) => this._renderMovie(i, container));
  }

  _renderMovie(movieData, container) {
    const movieController = new MovieController(movieData, getComments(this._commentsData, movieData.id), container, this.onDataChange, this.onChangeView);
    movieController.init();
    // movieController.setDefaultView();
    // console.log(movieController.setDefaultView())
    this._subscriptions.push(movieController.setDefaultView);
  }

  _sortingMovieToComments(movieData, commentsData) {
    let commentsDataOnMovie = movieData.map((i) => getComments(commentsData, i.id));
    let sortingCommentsDataOnMovie = commentsDataOnMovie.slice().sort((a, b) => b.length - a.length);
    let sortingMovieID = sortingCommentsDataOnMovie.map((i) => i[0].idFilm);

    const SortmovieData = sortingMovieID.reduce((movie, i) => {
      for (let a = 0; a < movieData.length; a++) {
        if (i === movieData[a].id) {
          movie.push(movieData[a]);
        }
      }
      return movie;
    }, []);
    return SortmovieData;
  }

  _sortingMovieToRated(movieData) {
    return movieData.slice().sort((a, b) => b.rating - a.rating);
  }

  _onBtnClick(evt) {
    evt.preventDefault();
    const movieData = this._movieData.slice(this._movieToRender, this._movieToRender + this._MAIN_BLOCK_LENGTH);
    this._movieToRender += this._MAIN_BLOCK_LENGTH;

    movieData.forEach((i) => this._renderMovie(i, this._allFilmsList.getElement().querySelector(`.films-list__container`)));

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

    movieDataToRender[sortType].forEach((i) => this._renderMovie(i, this._commentsData, container));
  }

  onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }
}