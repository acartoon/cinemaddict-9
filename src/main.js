import {searchTemplate} from './components/search.js';
import {profileTemplate} from './components/profile.js';
import {filtersTemplate} from './components/filters.js';
import {statsTemplate} from './components/stats.js';
import {sortTemplate} from './components/sort.js';
import {filmCardTemplate} from './components/film.js';
import {btnShowMoreTemplate} from './components/btn-show-more.js';
import {filmDtailsTemplate} from './components/film-details.js';
import {films, filters, comments, countWatched} from './data.js';
import {getComments, renderElement} from './utils.js';

const MAIN_BLOCK_LENGTH = 5;
let carsToRender = MAIN_BLOCK_LENGTH;
const SIDE_BLOCK_LENGTH = 2;
const filmsListType = [
  {
    title: `All movies. Upcoming`,
    count: MAIN_BLOCK_LENGTH,
    className: ``,
  },
  {
    title: `Top rated`,
    count: SIDE_BLOCK_LENGTH,
    className: `--extra`,
  },
  {
    title: `Most commented`,
    count: SIDE_BLOCK_LENGTH,
    className: `--extra`,
  }
];
const headerContainer = document.body.querySelector(`.header`);
const mainContainer = document.body.querySelector(`.main`);

const renderFilmsListContainer = (container, className) => {
  const filmsList = document.createElement(`section`);
  filmsList.classList.add(`films-list${className}`);
  renderElement(container, filmsList.outerHTML);
}

const renderFilmsList = (container, {title, count, className}) => {
  const filmsListTitle = document.createElement(`h2`);
  filmsListTitle.classList.add(`films-list__title`);
  if(className == ``) {
    filmsListTitle.classList.add(`visually-hidden`)
  }
  filmsListTitle.innerHTML = title;
  renderElement(container, filmsListTitle.outerHTML);

  const filmsListContainer = document.createElement(`div`);
  filmsListContainer.classList.add(`films-list__container`);
  renderElement(container, filmsListContainer.outerHTML);

  renderFilms(container.querySelector(`.films-list__container`), 0, count)
}

const renderFilters = () => mainContainer.querySelector(`.main-navigation`)
  .insertAdjacentHTML(`afterBegin`, filters.map(filtersTemplate).join(``));

const renderFilms = (container, start, end) => {
  container.insertAdjacentHTML(`beforeend`, films.map((item) => 
  filmCardTemplate(item, getComments(comments, item.id))).slice(start, end).join(``));
};

const renderFilmsDetails = (container) => {
  container.insertAdjacentHTML(`beforeend`, filmDtailsTemplate(films[5], getComments(comments, 5)));
};

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
renderElement(mainContainer, sortTemplate());

// filmsContainer
const filmsContainer = document.createElement(`section`);
filmsContainer.classList.add(`films`);

renderElement(mainContainer, filmsContainer.outerHTML);

// контейнеры фильмов
filmsListType.forEach((item) => {
  renderFilmsListContainer(mainContainer.querySelector(`.films`), item.className);
});

const sideBlock = document.querySelectorAll(`[class^="films-list"]`);

for (let i = 0; i < sideBlock.length; i++) {
  renderFilmsList(sideBlock[i], filmsListType[i]);
}

// popap
renderFilmsDetails(document.body);

// btn
renderElement(mainContainer.querySelector(`.films-list`), btnShowMoreTemplate());

const btnShowMore = mainContainer.querySelector(`.films-list__show-more`);

const clickBtn = (evt) => {
  evt.preventDefault();
  renderFilms(mainContainer.querySelector(`.films-list .films-list__container`), carsToRender, carsToRender + MAIN_BLOCK_LENGTH);
  carsToRender += MAIN_BLOCK_LENGTH;

  if (films.length <= carsToRender) {
    btnShowMore.classList.add(`visually-hidden`);
  }
};

btnShowMore.addEventListener(`click`, clickBtn);