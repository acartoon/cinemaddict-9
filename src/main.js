import {searchTemplate} from './components/search.js';
import {profileTemplate} from './components/profile.js';
import {filtersTemplate} from './components/filters.js';
import {statsTemplate} from './components/stats.js';
import {sortTemplate} from './components/sort.js';
import {filmCardTemplate} from './components/film-card.js';
import {btnShowMoreTemplate} from './components/btn-show-more.js';
import {filmDtailsTemplate} from './components/film-details.js';

const MAIN_BLOCK_LENGTH = 5;
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

function render(container, template, type = `beforeend`) {
  container.insertAdjacentHTML(type, template);
}

const renderFilmsListContainer = (container, className) => {
  const filmsList = document.createElement(`section`);
  filmsList.classList.add(`films-list${className}`);
  render(container, filmsList.outerHTML);
}

const renderFilmsList = (container, {title, count, className}) => {
  const filmsListTitle = document.createElement(`h2`);
  filmsListTitle.classList.add(`films-list__title`);
  if(className == ``) {
    filmsListTitle.classList.add(`visually-hidden`)
  }
  filmsListTitle.innerHTML = title;
  render(container, filmsListTitle.outerHTML);

  const filmsListContainer = document.createElement(`div`);
  filmsListContainer.classList.add(`films-list__container`);
  render(container, filmsListContainer.outerHTML);

  for (let i = 0; i < count; i++) {
    render(container.querySelector(`.films-list__container`), filmCardTemplate());
  }
}

const headerContainer = document.body.querySelector(`.header`);

// search
render(headerContainer, searchTemplate());

// profile
const profileContainer = document.createElement(`section`);
profileContainer.classList.add(`header__profile`, `profile`);

render(headerContainer, profileContainer.outerHTML);
render(headerContainer.querySelector(`.header__profile.profile`), profileTemplate());

// nav
const mainContainer = document.body.querySelector(`.main`);
const navContainer = document.createElement(`nav`);
navContainer.classList.add(`main-navigation`);

render(mainContainer, navContainer.outerHTML);
render(mainContainer.querySelector(`.main-navigation`), filtersTemplate());
render(mainContainer.querySelector(`.main-navigation`), statsTemplate());
render(mainContainer, sortTemplate());


// content
const filmsContainer = document.createElement(`section`);
filmsContainer.classList.add(`films`);

render(mainContainer, filmsContainer.outerHTML);

// контейнеры фильмов
filmsListType.forEach((item) => {
  renderFilmsListContainer(mainContainer.querySelector(`.films`), item.className);
});

const sideBlock = document.querySelectorAll(`[class^="films-list"]`);

for (let i = 0; i < sideBlock.length; i++) {
  renderFilmsList(sideBlock[i], filmsListType[i]);
}

// btn
render(mainContainer.querySelector(`.films-list`), btnShowMoreTemplate());

// popap
const bodyContainer = document.body;

render(bodyContainer, filmDtailsTemplate());
