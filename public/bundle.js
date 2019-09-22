/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/btn-show-more.js":
/*!*****************************************!*\
  !*** ./src/components/btn-show-more.js ***!
  \*****************************************/
/*! exports provided: btnShowMoreTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "btnShowMoreTemplate", function() { return btnShowMoreTemplate; });
const btnShowMoreTemplate = () =>
  `<button class="films-list__show-more">Show more</button>`;


/***/ }),

/***/ "./src/components/film-card.js":
/*!*************************************!*\
  !*** ./src/components/film-card.js ***!
  \*************************************/
/*! exports provided: filmCardTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filmCardTemplate", function() { return filmCardTemplate; });
const filmCardTemplate = () =>
  `<article class="film-card">
          <h3 class="film-card__title">Popeye the Sailor Meets Sindbad the Sailor</h3>
          <p class="film-card__rating">6.3</p>
          <p class="film-card__info">
            <span class="film-card__year">1936</span>
            <span class="film-card__duration">16m</span>
            <span class="film-card__genre">Cartoon</span>
          </p>
          <img src="./images/posters/popeye-meets-sinbad.png" alt="" class="film-card__poster">
          <p class="film-card__description">In this short, Sindbad the Sailor (presumably Bluto playing a "role") proclaims himself, in song, to be the greatest sailor, adventurer and…</p>
          <a class="film-card__comments">0 comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--active">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched film-card__controls-item--active">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active">Mark as favorite</button>
          </form>
        </article>`;


/***/ }),

/***/ "./src/components/film-details.js":
/*!****************************************!*\
  !*** ./src/components/film-details.js ***!
  \****************************************/
/*! exports provided: filmDtailsTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filmDtailsTemplate", function() { return filmDtailsTemplate; });
const filmDtailsTemplate = () =>
  `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/the-great-flamarion.jpg" alt="">

          <p class="film-details__age">18+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">The Great Flamarion</h3>
              <p class="film-details__title-original">Original: The Great Flamarion</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">8.9</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">Anthony Mann</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">Anne Wigton, Heinz Herald, Richard Weil</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">Erich von Stroheim, Mary Beth Hughes, Dan Duryea</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">30 March 1945</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">1h 18m</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">USA</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">Drama</span>
                <span class="film-details__genre">Film-Noir</span>
                <span class="film-details__genre">Mystery</span></td>
            </tr>
          </table>

          <p class="film-details__film-description">
            The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Great Flamarion (Erich von Stroheim) is an arrogant, friendless, and misogynous marksman who displays his trick gunshot act in the vaudeville circuit. His show features a beautiful assistant, Connie (Mary Beth Hughes) and her drunken husband Al (Dan Duryea), Flamarion's other assistant. Flamarion falls in love with Connie, the movie's femme fatale, and is soon manipulated by her into killing her no good husband during one of their acts.
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>

        <ul class="film-details__comments-list">
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/smile.png" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">Interesting setting and a good cast</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">Tim Macoveev</span>
                <span class="film-details__comment-day">3 days ago</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/sleeping.png" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">Booooooooooring</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">John Doe</span>
                <span class="film-details__comment-day">2 days ago</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/puke.png" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">Very very old. Meh</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">John Doe</span>
                <span class="film-details__comment-day">2 days ago</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/angry.png" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">Almost two hours? Seriously?</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">John Doe</span>
                <span class="film-details__comment-day">Today</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
            <label class="film-details__emoji-label" for="emoji-gpuke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;


/***/ }),

/***/ "./src/components/filters.js":
/*!***********************************!*\
  !*** ./src/components/filters.js ***!
  \***********************************/
/*! exports provided: filtersTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filtersTemplate", function() { return filtersTemplate; });
const filtersTemplate = () =>
  `<a href="#all" class="main-navigation__item">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>`;


/***/ }),

/***/ "./src/components/profile.js":
/*!***********************************!*\
  !*** ./src/components/profile.js ***!
  \***********************************/
/*! exports provided: profileTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "profileTemplate", function() { return profileTemplate; });
const profileTemplate = () =>
  `<p class="profile__rating">Movie Buff</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">`;


/***/ }),

/***/ "./src/components/search.js":
/*!**********************************!*\
  !*** ./src/components/search.js ***!
  \**********************************/
/*! exports provided: searchTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchTemplate", function() { return searchTemplate; });
const searchTemplate = () =>
  `<form class="header__search search">
  <input type="text" name="search" class="search__field" placeholder="Search movies">
  <svg fill="#7171D8" class="search__film-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19">
    <path fill-rule="nonzero" d="M2 0v4.524h2.833V0h11.334v4.524H19V0h1v19h-1v-4.524h-2.833V19H4.833v-4.524H2V19H0V0h2zm0 7.238v4.524h2.833V7.238H2zm14.167 0v4.524H19V7.238h-2.833z"/>
  </svg>
  <button type="submit" class="visually-hidden">Search</button>
  <button class="search__reset" type="reset">Reset</button>
</form>`;


/***/ }),

/***/ "./src/components/sort.js":
/*!********************************!*\
  !*** ./src/components/sort.js ***!
  \********************************/
/*! exports provided: sortTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortTemplate", function() { return sortTemplate; });
const sortTemplate = () =>
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`;


/***/ }),

/***/ "./src/components/stats.js":
/*!*********************************!*\
  !*** ./src/components/stats.js ***!
  \*********************************/
/*! exports provided: statsTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "statsTemplate", function() { return statsTemplate; });
const statsTemplate = () =>
  `<a href="#stats" class="main-navigation__item main-navigation__item--additional main-navigation__item--active">Stats</a>`;


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_search_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/search.js */ "./src/components/search.js");
/* harmony import */ var _components_profile_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/profile.js */ "./src/components/profile.js");
/* harmony import */ var _components_filters_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/filters.js */ "./src/components/filters.js");
/* harmony import */ var _components_stats_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/stats.js */ "./src/components/stats.js");
/* harmony import */ var _components_sort_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/sort.js */ "./src/components/sort.js");
/* harmony import */ var _components_film_card_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/film-card.js */ "./src/components/film-card.js");
/* harmony import */ var _components_btn_show_more_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/btn-show-more.js */ "./src/components/btn-show-more.js");
/* harmony import */ var _components_film_details_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/film-details.js */ "./src/components/film-details.js");









const CARDS_LENGTH = 5;
const CARDS_LENGTH_EXTRA = 2;
const titlesArr = [`Top rated`, `Most commented`];

function render(container, template, type = `beforeend`) {
  container.insertAdjacentHTML(type, template);
}

const headerContainer = document.body.querySelector(`.header`);

// search
render(headerContainer, Object(_components_search_js__WEBPACK_IMPORTED_MODULE_0__["searchTemplate"])());

// profile
const profileContainer = document.createElement(`section`);
profileContainer.classList.add(`header__profile`, `profile`);

render(headerContainer, profileContainer.outerHTML);
render(headerContainer.querySelector(`.header__profile.profile`), Object(_components_profile_js__WEBPACK_IMPORTED_MODULE_1__["profileTemplate"])());

// nav
const mainContainer = document.body.querySelector(`.main`);
const navContainer = document.createElement(`nav`);
navContainer.classList.add(`main-navigation`);

render(mainContainer, navContainer.outerHTML);
render(mainContainer.querySelector(`.main-navigation`), Object(_components_filters_js__WEBPACK_IMPORTED_MODULE_2__["filtersTemplate"])());
render(mainContainer.querySelector(`.main-navigation`), Object(_components_stats_js__WEBPACK_IMPORTED_MODULE_3__["statsTemplate"])());
render(mainContainer, Object(_components_sort_js__WEBPACK_IMPORTED_MODULE_4__["sortTemplate"])());


// content
const filmsContainer = document.createElement(`section`);
filmsContainer.classList.add(`films`);

render(mainContainer, filmsContainer.outerHTML);

// filmsList
const filmsList = document.createElement(`section`);
filmsList.classList.add(`films-list`);

render(mainContainer.querySelector(`.films`), filmsList.outerHTML);

const filmsListContainer = document.createElement(`div`);
filmsListContainer.classList.add(`films-list__container`);

render(mainContainer.querySelector(`.films-list`), filmsListContainer.outerHTML);

for (let i = 0; i < CARDS_LENGTH; i++) {
  render(mainContainer.querySelector(`.films-list__container`), Object(_components_film_card_js__WEBPACK_IMPORTED_MODULE_5__["filmCardTemplate"])());
}

// btn
render(mainContainer.querySelector(`.films-list`), Object(_components_btn_show_more_js__WEBPACK_IMPORTED_MODULE_6__["btnShowMoreTemplate"])());

// filmsListExtra
const filmsListExtra = document.createElement(`section`);
filmsListExtra.classList.add(`films-list--extra`);

for (let i = 0; i < CARDS_LENGTH_EXTRA; i++) {
  render(mainContainer.querySelector(`.films`), filmsListExtra.outerHTML);
}

const filmsListTitle = document.createElement(`h2`);
filmsListTitle.classList.add(`films-list__title`);

let filmsListExtraContainer = mainContainer.querySelectorAll(`.films-list--extra`);

filmsListExtraContainer.forEach((item, i) => {
  render(item, filmsListTitle.outerHTML);
  item.querySelector(`.films-list__title`).innerHTML = titlesArr[i];

  render(item, filmsListContainer.outerHTML);

  for (let a = 0; a < CARDS_LENGTH_EXTRA; a++) {
    render(item.querySelector(`.films-list__container`), Object(_components_film_card_js__WEBPACK_IMPORTED_MODULE_5__["filmCardTemplate"])());
  }
});

// popap
const bodyContainer = document.body;

render(bodyContainer, Object(_components_film_details_js__WEBPACK_IMPORTED_MODULE_7__["filmDtailsTemplate"])());


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map