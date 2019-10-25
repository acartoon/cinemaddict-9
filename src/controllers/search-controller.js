import {render, Position} from '../utils.js';
import MovieListController from '../controllers/movie-list-controller.js';
import SearchResultCount from '../components/search-result-count.js';
import MovieList from '../components/movie-list.js';
import MovieContainer from '../components/movie-container.js';

export default class SearchController {
  constructor(container, onDataChange) {
    this._container = container;
    this._value = null;
    this._movieData = [];
    this._movieToRender = [];
    this._commentsData = [];
    this.onDataChangeMain = onDataChange;
    this._searchResultCount = new SearchResultCount(this._movieToRender.length);
    this._movieContainer = new MovieContainer();
    this._movieList = new MovieList(false, `All movies. Upcoming`);
    this._movieListController = null;

    this._init();
  }

  _init() {
    render(this._container, this._searchResultCount.getElement(), Position.BEFOREEND);
    render(this._container, this._movieContainer.getElement(), Position.BEFOREEND);
    render(this._movieContainer.getElement(), this._movieList.getElement(), Position.BEFOREEND);
    this.hidden();
  }

  getMovie(value, movieData, commentsData) {
    this._movieData = movieData;
    this._commentsData = commentsData;
    this._value = value;

    this._movieToRender = this._movieData.filter((movie) => {
      return movie.name.toLowerCase().includes(this._value.toLowerCase());
    });

    this.show();
    this._renderSearchResult(this._movieToRender.length);
    this._renderBoard(this._movieToRender, this._commentsData);
  }

  _renderSearchResult(count) {
    this._searchResultCount.getElement().querySelector(`.result__count`).innerHTML = count;
  }

  _renderBoard(movieData, commentsData) {
    const container = this._movieList.getElement().querySelector(`.films-list__container`);
    container.innerHTML = ``;
    const movieListController = new MovieListController(container, movieData, commentsData, this.onDataChange.bind(this));
    movieListController.init();
  }

  hidden() {
    this._searchResultCount.getElement().classList.add(`visually-hidden`);
    this._movieList.getElement().classList.add(`visually-hidden`);
  }

  show() {
    this._searchResultCount.getElement().classList.remove(`visually-hidden`);
    this._movieList.getElement().classList.remove(`visually-hidden`);
  }

  onDataChange(newData, typeDataChange) {
    if (typeDataChange === `userState`) {
      this._movieData = newData;
    } else if (typeDataChange === `comment`) {
      this._commentsData = newData;
    }
    this.onDataChangeMain(newData, typeDataChange);
  }
}
