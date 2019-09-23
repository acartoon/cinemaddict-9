export const filmCardTemplate = ({name, genres, rating, runtime, description, watchlist, watched, favorite, releaseDate, poster}, comments) => `<article class="film-card">
  <h3 class="film-card__title">${name}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${releaseDate.getFullYear()}</span>
    <span class="film-card__duration">${runtime}</span>
    <span class="film-card__genre">${genres[0]}</span>
  </p>
  <img src="${poster}" alt="" class="film-card__poster">
<<<<<<< HEAD
  <p class="film-card__description">${description.length < 140 ? description : `${description.slice(0, 139).trim()}…`}</p>
=======
  <p class="film-card__description">${description}</p>
>>>>>>> 4b5cb16f0cf994efae91d04d2b29173be3c8aa83
  <a class="film-card__comments">${comments.length} comments</a>
  <form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite ${favorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
  </form>
</article>`.trim();
