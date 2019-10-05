import {searchTemplate} from './components/search.js';
import {profileTemplate} from './components/profile.js';
import {filtersTemplate} from './components/filters.js';
import {statsTemplate} from './components/stats.js';
import {movie, filters, comments, countWatched} from './data.js';
import {renderElement, render, Position} from './utils.js';
import PageController from './controllers/page-controller.js';
import SearchComponent from './components/search-component.js';


const headerContainer = document.body.querySelector(`.header`);
const mainContainer = document.body.querySelector(`.main`);

const renderFilters = () => mainContainer.querySelector(`.main-navigation`)
  .insertAdjacentHTML(`afterBegin`, filters.map(filtersTemplate).join(``));

// search
renderElement(headerContainer, searchTemplate());

// profile
const profileContainer = document.createElement(`section`);
profileContainer.classList.add(`header__profile`, `profile`);

renderElement(headerContainer, profileContainer.outerHTML);
renderElement(headerContainer.querySelector(`.header__profile.profile`), profileTemplate(countWatched));

// nav
const navContainer = document.createElement(`nav`);
navContainer.classList.add(`main-navigation`);

renderElement(mainContainer, navContainer.outerHTML);
renderFilters();
renderElement(mainContainer.querySelector(`.main-navigation`), statsTemplate());

const pageController = new PageController(mainContainer, movie, comments);
pageController.init();

const searchComponent = new SearchComponent();
render(mainContainer, searchComponent.getElement(), Position.BEFOREEND);


const footerStatistics = document.querySelector(`.footer__statistics p`);
footerStatistics.innerHTML = `${movie.length} movies inside`;
