import AbstractComponent from './abstract-component.js';

export default class SearchComponent extends AbstractComponent {
  constructor() {
    super();
  }
  getTemplate() {
    return `<div class="resultffff">
    <p class="result__text">Result <span class="result__count">1</span></p>
  </div>
  <section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container">
        <article class="film-card">
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
        </article>
      </div>
    </section>`;
  }
}
