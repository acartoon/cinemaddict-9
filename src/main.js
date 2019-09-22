import {searchTemplate} from './components/search.js';
import {profileTemplate} from './components/profile.js';
import {filtersTemplate} from './components/filters.js';
import {statsTemplate} from './components/stats.js';
import {sortTemplate} from './components/sort.js';
import {filmCardTemplate} from './components/film.js';
import {btnShowMoreTemplate} from './components/btn-show-more.js';
import {filmDtailsTemplate} from './components/film-details.js';
import {films, filters, comments, titles, countWatched} from './data.js';
import {getComments} from './utils.js';

const CARDS_COUNT_EXTRA = 2;
const STEP_TO_RENDER = 5;
let carsToRender = STEP_TO_RENDER;
const headerContainer = document.body.querySelector(`.header`);
const mainContainer = document.body.querySelector(`.main`);

function render(container, template, type = `beforeend`) {
  container.insertAdjacentHTML(type, template);
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
render(headerContainer, searchTemplate());

// profile
const profileContainer = document.createElement(`section`);
profileContainer.classList.add(`header__profile`, `profile`);

render(headerContainer, profileContainer.outerHTML);
render(headerContainer.querySelector(`.header__profile.profile`), profileTemplate(countWatched));

// nav
const navContainer = document.createElement(`nav`);
navContainer.classList.add(`main-navigation`);

render(mainContainer, navContainer.outerHTML);
renderFilters();
render(mainContainer.querySelector(`.main-navigation`), statsTemplate());

render(mainContainer, sortTemplate());

// filmsContainer
const filmsContainer = document.createElement(`section`);
filmsContainer.classList.add(`films`);

render(mainContainer, filmsContainer.outerHTML);

// filmsList
const filmsList = document.createElement(`section`);
filmsList.classList.add(`films-list`);

render(mainContainer.querySelector(`.films`), filmsList.outerHTML);

// filmsListContainer
const filmsListContainer = document.createElement(`div`);
filmsListContainer.classList.add(`films-list__container`);

render(mainContainer.querySelector(`.films-list`), filmsListContainer.outerHTML);

// renderFilms
renderFilms(mainContainer.querySelector(`.films-list .films-list__container`), 0, carsToRender);

// filmsListExtra
const filmsListExtra = document.createElement(`section`);
filmsListExtra.classList.add(`films-list--extra`);

for (let i = 0; i < CARDS_COUNT_EXTRA; i++) {
  render(mainContainer.querySelector(`.films`), filmsListExtra.outerHTML);
}

const filmsListTitle = document.createElement(`h2`);
filmsListTitle.classList.add(`films-list__title`);

let filmsListExtraContainer = mainContainer.querySelectorAll(`.films-list--extra`);

filmsListExtraContainer.forEach((item, i) => {
  render(item, filmsListTitle.outerHTML);
  item.querySelector(`.films-list__title`).innerHTML = titles[i];

  render(item, filmsListContainer.outerHTML);
  renderFilms(item.querySelector(`.films-list__container`), 0, CARDS_COUNT_EXTRA);
});

const footerStatistics = document.querySelector(`.footer__statistics p`);
footerStatistics.innerHTML = `${films.length} movies inside`;

// popap
renderFilmsDetails(document.body);

// btn
render(mainContainer.querySelector(`.films-list`), btnShowMoreTemplate());

const btnShowMore = mainContainer.querySelector(`.films-list__show-more`);

const clickBtn = (evt) => {
  evt.preventDefault();
  renderFilms(mainContainer.querySelector(`.films-list .films-list__container`), carsToRender, carsToRender + STEP_TO_RENDER);
  carsToRender += STEP_TO_RENDER;

  if (films.length <= carsToRender) {
    btnShowMore.classList.add(`visually-hidden`);
  }
};

btnShowMore.addEventListener(`click`, clickBtn);
