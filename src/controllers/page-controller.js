import MovieBoradController from "./movie-board-controller";
import Search from '../components/search.js';
import {render, Position} from "../utils";
import NavigationElement from "../components/navigation-element";
import NavigationContainer from "../components/navigation-container";
import Stats from "../components/stats";
import Profile from "../components/profile";
import StatsComponent from "../components/stats-component";
import SearchController from "./search-controller";

export default class PageController {
  constructor(container, movieData, commentsData, filters) {
    this._container = container;
    this._movieData = movieData;
    this._commentsData = commentsData;
    this._filters = filters;
    this._navigationContainer = new NavigationContainer();
    this._search = new Search();
    this._stats = new Stats();
    this._profile = new Profile();
    this._toggle = false;
    this._statsComponent = new StatsComponent();
    this._searchController = new SearchController(this._container.querySelector(`.main`), this.onDataChange.bind(this));
    this._resetSearchBoard = this._resetSearchBoard.bind(this);
    this._getSearchResult = this._getSearchResult.bind(this);
  }
  init() {
    render(this._container.querySelector(`.header`), this._search.getElement(), Position.BEFOREEND);
    render(this._container.querySelector(`.header`), this._profile.getElement(), Position.BEFOREEND);
    this._renderMainNav(this._filters);
    this._movieBoradController = new MovieBoradController(this._container.querySelector(`.main`), this.onDataChange.bind(this));
    this._movieBoradController.show(this._movieData, this._commentsData, this.onDataChange.bind(this));
    render(this._container.querySelector(`.main`), this._statsComponent.getElement(), Position.BEFOREEND);
    this._getSearchBoard();
  }

  _toggleStats() {
    this._stats.getElement().addEventListener(`click`, () => {
      this._toggle = !this._toggle;
      if (this._toggle === true) {
        this._movieBoradController.hide();
        this._statsComponent.show();
        this._stats.getElement().classList.add(`main-navigation__item--active`);
      } else {
        this._movieBoradController.show(this._movieData, this._commentsData);
        this._statsComponent.hide();
        this._stats.getElement().classList.remove(`main-navigation__item--active`);
      }
    });
  }
  _renderMainNav(filters) {
    render(this._container.querySelector(`.main`), this._navigationContainer.getElement(), Position.BEFOREEND);
    filters.forEach((filter) => {
      const navigationElement = new NavigationElement(filter);
      render(this._navigationContainer.getElement(), navigationElement.getElement(), Position.BEFOREEND);
    });
    render(this._navigationContainer.getElement(), this._stats.getElement(), Position.BEFOREEND);
    this._toggleStats();
  }

  _hideMainNav() {
    this._navigationContainer.getElement().classList.add(`visually-hide`);
  }
  _showMainNav() {
    this._navigationContainer.getElement().classList.remove(`visually-hide`);
  }

  onDataChange(newData, typeDataChange) {
    if (typeDataChange === `userState`) {
      this._movieData = newData;
    } else if (typeDataChange === `comment`) {
      this._commentsData = newData;
    }
  }

  _getSearchBoard() {
    const search = this._search.getElement().querySelector(`.search__field`);
    search.addEventListener(`keyup`, this._getSearchResult);
  }

  _getSearchResult(evt) {
    const searchValue = evt.target.value;
    const resetSearchBtn = this._search.getElement().querySelector(`.search__reset`);
    if (searchValue.length >= 3) {
      this._movieBoradController.hide();
      this._statsComponent.hide();
      this._hideMainNav();
      this._searchController.getMovie(searchValue, this._movieData, this._commentsData);
      resetSearchBtn.addEventListener(`click`, this._resetSearchBoard);
    } else if (searchValue.length < 1) {
      this._resetSearchBoard();
      resetSearchBtn.removeEventListener(`click`, this._resetSearchBoard);
    }
  }

  _resetSearchBoard() {
    this._searchController.hide();
    this._showMainNav();
    this._movieBoradController.show(this._movieData, this._commentsData);
  }
}
