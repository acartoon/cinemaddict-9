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
  }

  init() {
    render(this._container, this._sort.getElement(), Position.BEFOREEND);
    render(this._container, this._movieContainer.getElement(), Position.BEFOREEND);

    this._movieToRender = (this._movieData.length < this._MAIN_BLOCK_LENGTH) ? this._movieData.length : this._MAIN_BLOCK_LENGTH;
    this._renderMovieList(this._allFilmsList, this._movieData.slice(0, this._movieToRender));
    this._renderMovieList(this._topRatedFilmsList, this._sortingMovieToRated().slice(0, this._SIDE_BLOCK_LENGTH));
    this._renderMovieList(this._mostCommentedFilmsList, this._sortingMovieToComments().slice(0, this._SIDE_BLOCK_LENGTH));
    render(this._allFilmsList.getElement(), this._btnShowMore.getElement(), Position.BEFOREEND);
  }

    onDataChange(newData, oldData) {
      const index = this._films.findIndex((it) => it.id === oldData.id);
      this._films[index] = newData;
      this._renderBoard_(index);
    }

  _renderMovieBoard(data, container) {
    data.forEach((i) => new MovieController(i, getComments(this._commentsData, i.id), container).init());
  }
  
  _renderMovieList(movieList, data) {
    render(this._movieContainer.getElement(), movieList.getElement(), Position.BEFOREEND);
    const container = movieList.getElement().querySelector(`.films-list__container`);
    this._renderMovieBoard(data, container);

    //если с флагом
    
  }

  _sortingMovieToComments() {
    let commentsDataOnMovie = this._movieData.map((i) => getComments(this._commentsData, i.id));
    let sortingCommentsDataOnMovie = commentsDataOnMovie.slice().sort((a, b) => b.length - a.length);
    let sortingMovieID = sortingCommentsDataOnMovie.map((i) => i[0].idFilm);

    const movieData = sortingMovieID.reduce((movie, i) => {
      for (let a = 0; a < this._movieData.length; a++) {
        if (i === this._movieData[a].id) {
          movie.push(this._movieData[a]);
        }
      }
      return movie;
    }, []);
    return movieData;
  }

  _sortingMovieToRated() {
    return this._movieData.slice().sort((a, b) => b.rating - a.rating);
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
