import {searchTemplate} from './components/search.js';
import {profileTemplate} from './components/profile.js';
import {filtersTemplate} from './components/filters.js';
import {statsTemplate} from './components/stats.js';
import {sortTemplate} from './components/sort.js';
import {btnShowMoreTemplate} from './components/btn-show-more.js';
import {movie, filters, comments, countWatched} from './data.js';
import {render, unrender, Position, renderElement, getComments} from './utils.js';
import PageController from './controllers/page-controller.js';

const headerContainer = document.body.querySelector(`.header`);
const mainContainer = document.body.querySelector(`.main`);

const renderFilmsListContainer = (container, className) => {
  const filmsList = document.createElement(`section`);
  filmsList.classList.add(`films-list${className}`);
  renderElement(container, filmsList.outerHTML);
};


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
renderElement(mainContainer, sortTemplate());

// filmsContainer
const filmsContainer = document.createElement(`section`);
filmsContainer.classList.add(`films`);

renderElement(mainContainer, filmsContainer.outerHTML);

const pageController = new PageController(mainContainer.querySelector(`.films`), movie, comments);
pageController.init();

const footerStatistics = document.querySelector(`.footer__statistics p`);
footerStatistics.innerHTML = `${movie.length} movies inside`;

// btn
// renderElement(mainContainer.querySelector(`.films-list`), btnShowMoreTemplate());

const btnShowMore = mainContainer.querySelector(`.films-list__show-more`);


// btnShowMore.addEventListener(`click`, clickBtn);
