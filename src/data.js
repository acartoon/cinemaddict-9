import {
  getRandomRating,
  getRandomElements,
  descriptionFilm,
  getRandomDate,
  getrandomInteger,
  getRandomTime,
  counterFilters,
  getCountWatchlist,
  getCountFavorite,
  getCountwatched,
  generateCommetnts
} from './utils.js';

const FILMS_LENGTH = 15;

const namesFilm = new Set([
  `Здравствуйте, я Ваша тетя`,
  `Собака баскервилей`,
  `Some Like It Hot`,
  `Jurassic Park`,
  `Psycho`,
  `Rear Window`,
  `Dial M for Murder`,
  `The Thing`,
  `Мой ласковый и нежный зверь`,
  `Сталкер`,
  `Солярис`,
  `Alien`,
  `The Silence of the Lambs`,
  `The Shining`,
  `Ghostbusters`,
]);

const namesPiples = new Set([
  `Alfred Hitchcock`,
  `Stanley Kubrick`,
  `Steven Spielberg`,
  `Андрей Тарковский`,
  `Quentin Tarantino`,
  `Sigourney Weaver`,
  `John Hurt`,
  `Ian Holm`,
]);

const countries = new Set([`USA`, `Russia`, `UK`, `New Zealand`]);
const genres = new Set([`Horror`, `Comedy`, `Romance`, `Fantasy`, `Drama`, `Cartoon`]);
const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const posters = [`./images/posters/made-for-each-other.png`, `./images/posters/popeye-meets-sinbad.png`, `./images/posters/sagebrush-trail.jpg`, `./images/posters/santa-claus-conquers-the-martians.jpg`, `./images/posters/the-dance-of-life.jpg`, `./images/posters/the-great-flamarion.jpg`, `./images/posters/the-man-with-the-golden-arm.jpg`];
const emojis = [`smile`, `sleeping`, `puke`, `angry`];

const film = () => ({
  id: null,
  name: null,
  originalName: null,
  director: Array.from(namesPiples)[getrandomInteger(4)],
  genres: getRandomElements(Array.from(genres), getrandomInteger(4)),
  rating: getRandomRating(),
  ownrating: getrandomInteger(10),
  runtime: getRandomTime(),
  description: descriptionFilm(description),
  watchlist: Boolean(Math.round(Math.random())),
  watched: Boolean(Math.round(Math.random())),
  favorite: Boolean(Math.round(Math.random())),
  writers: getRandomElements(Array.from(namesPiples), 2).join(`, `),
  actors: getRandomElements(Array.from(namesPiples), 3).join(`, `),
  releaseDate: getRandomDate(),
  country: Array.from(countries)[Math.floor(Math.random() * 4)],
  age: `${getrandomInteger(21)}+`,
  poster: posters[getrandomInteger(6)],
});

const comment = () => ({
  id: null,
  idFilm: null,
  comment: descriptionFilm(description),
  author: Array.from(namesPiples)[getrandomInteger(8)],
  date: `${getrandomInteger(10, 2)} days ago`,
  emotion: emojis[getrandomInteger(0, 3)],
});

const films = new Array(FILMS_LENGTH).fill(``).map(film);
const comments = [];

for (let i = 0; i < FILMS_LENGTH; i++) {
  films[i].id = i;
  films[i].name = Array.from(namesFilm)[i];
  films[i].originalName = Array.from(namesFilm)[i];
}

generateCommetnts(FILMS_LENGTH, comment, comments);

const countWatched = counterFilters(films, getCountwatched);

const filters = [
  {
    title: `All movies`,
    count: FILMS_LENGTH,
    link: `#`,
  },
  {
    title: `Watchlist`,
    count: counterFilters(films, getCountWatchlist),
    link: `Watchlist`,
  },
  {
    title: `History`,
    count: countWatched,
    link: `history`,
  },
  {
    title: `Favorites`,
    count: counterFilters(films, getCountFavorite),
    link: `favorites`,
  },
];

export {films, comments, filters, countWatched};
