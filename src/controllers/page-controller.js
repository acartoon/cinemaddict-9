import { MovieList } from "../components/movie-list";
import {render, unrender, Position, renderElement, getComments} from './utils.js';

export default class PageController {
  constructor(container, movieData, commentsData) {
    this._container = container;
    this._movieData = movieData;
    this._commentsData = commentsData;
    this._allFilmsList = new MovieList(false, `All movies. Upcoming`);
    this._topRatedFilmsList = new MovieList(true, `Top rated`);
    this._mostCommentedFilmsList = new MovieList(true, `Most commented`);
    this._MAIN_BLOCK_LENGTH = 5;
    this._movieToRender = null;
    this._SIDE_BLOCK_LENGTH = 2;

  }

  init() {
    this._movieToRender = (this._movieData.length < this._MAIN_BLOCK_LENGTH) ? this._movieData.length : this._MAIN_BLOCK_LENGTH;

  }

  _func(movieList, data) {
    render(this._container, movieList.getElement())
  }
}