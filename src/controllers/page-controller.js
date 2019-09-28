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
  }

  init() {
    this._movieToRender = (this._movieData.length < this._MAIN_BLOCK_LENGTH) ? this._movieData.length : this._MAIN_BLOCK_LENGTH;
    render(this._container, this._sort.getElement(), Position.BEFOREEND);
    render(this._container, this._movieContainer.getElement(), Position.BEFOREEND);
    render(this._movieContainer.getElement(), this._allFilmsList.getElement(), Position.BEFOREEND);
    render(this._movieContainer.getElement(), this._topRatedFilmsList.getElement(), Position.BEFOREEND);
    render(this._movieContainer.getElement(), this._mostCommentedFilmsList.getElement(), Position.BEFOREEND);
    this._renderMovieBoard(this._movieData, this._commentsData);
    
    if(this._movieToRender <= this._movieData.length)
      render(this._allFilmsList.getElement(), this._btnShowMore.getElement(), Position.BEFOREEND);
  }

  onDataChange(newData, oldData) {
    const index = this._movieData.findIndex((it) => it.id === oldData.id);
    this._movieData[index] = newData;
    this._renderMovieBoard(this._movieData, this._commentsData);
  }

  _renderMovieBoard(movieData, commentsData) {
    const movieLists = [
      {container: this._allFilmsList, data: movieData.slice(0, this._movieToRender)},
      {container: this._topRatedFilmsList, data: this._sortingMovieToRated(movieData).slice(0, this._SIDE_BLOCK_LENGTH)},
      {container: this._mostCommentedFilmsList, data: this._sortingMovieToComments(movieData, commentsData).slice(0, this._SIDE_BLOCK_LENGTH)},
    ]

    movieLists.forEach((i) => {
      const container = i.container.getElement().querySelector(`.films-list__container`);
      container.innerHTML = ``;
      i.data.forEach((a) => this._renderMovie(a, commentsData, container));
    })
  }

  _renderMovie(movieData, commentsData, container) {
    const movieController = new MovieController(movieData, getComments(commentsData, movieData.id), container, this.onDataChange);
    movieController.init();
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
    console.log('click')
    const movieData = this._movieData.slice(this._movieToRender, this._movieToRender + this._MAIN_BLOCK_LENGTH);
    this._movieToRender += this._MAIN_BLOCK_LENGTH;

    movieData.forEach((i) => this._renderMovie(i, this._commentsData, this._allFilmsList.getElement().querySelector(`.films-list__container`)));

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
}
