import {
  getRandomElements,
  descriptionFilm,
  getRandomDate,
  getRandomInteger,
  getRandomTime,
  counterFilters,
  getCountWatchlist,
  getCountFavorite,
  getCountwatched,
  generateCommetnts
} from './utils.js';

const MOVIE_LENGTH = 15;

const filmNames = new Set([
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

const namesPeople = new Set([
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
const movie = [];
const comments = [];

const generateMovie = () => ({
  id: null,
  name: null,
  originalName: null,
  director: Array.from(namesPeople)[getRandomInteger(4)],
  genres: getRandomElements(Array.from(genres), getRandomInteger(4)),
  rating: getRandomInteger(10),
  ownrating: getRandomInteger(9),
  runtime: getRandomTime(),
  description: descriptionFilm(description),
  watchlist: Boolean(Math.round(Math.random())),
  watched: Boolean(Math.round(Math.random())),
  favorite: Boolean(Math.round(Math.random())),
  writers: getRandomElements(Array.from(namesPeople), 2).join(`, `),
  actors: getRandomElements(Array.from(namesPeople), 3).join(`, `),
  releaseDate: getRandomDate(),
  country: Array.from(countries)[Math.floor(Math.random() * 4)],
  age: `${getRandomInteger(21)}+`,
  poster: posters[getRandomInteger(6)],
});

const generateComment = () => ({
  id: null,
  idFilm: null,
  comment: descriptionFilm(description),
  author: Array.from(namesPeople)[getRandomInteger(Array.from(namesPeople).length-1)],
  date: `${getRandomInteger(10, 2)} days ago`,
  emotion: emojis[getRandomInteger(0, 3)],
});

for(let i = 0; i < MOVIE_LENGTH; i++ ) {
  movie.push(generateMovie());
  movie[i] = { ...movie[i], id: i, name: Array.from(filmNames)[i], originalName: Array.from(filmNames)[i] };
}

generateCommetnts(MOVIE_LENGTH, generateComment, comments);

const countWatched = counterFilters(movie, getCountwatched);

const filters = [
  {
    title: `All movies`,
    count: MOVIE_LENGTH,
    link: `#`,
  },
  {
    title: `Watchlist`,
    count: counterFilters(movie, getCountWatchlist),
    link: `Watchlist`,
  },
  {
    title: `History`,
    count: countWatched,
    link: `history`,
  },
  {
    title: `Favorites`,
    count: counterFilters(movie, getCountFavorite),
    link: `favorites`,
  },
];

export {movie, comments, filters, countWatched};
