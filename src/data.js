import {
  getRandomElements,
  getDescriptionFilm,
  getRandomDate,
  getRandomInteger,
  getRandomTime,
  getCountFilms,
  generateComments,
  emojis,
  getRandomString
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
const movie = [];

const generateMovie = () => ({
  id: getRandomString(3),
  name: null,
  originalName: null,
  director: Array.from(namesPeople)[getRandomInteger(4)],
  genres: getRandomElements(Array.from(genres), getRandomInteger(4), getRandomInteger),
  rating: getRandomInteger(10),
  ownrating: getRandomInteger(9),
  runtime: getRandomTime(),
  description: getDescriptionFilm(description),
  watchlist: Boolean(Math.round(Math.random())),
  watched: Boolean(Math.round(Math.random())),
  favorite: Boolean(Math.round(Math.random())),
  writers: getRandomElements(Array.from(namesPeople), 2, getRandomInteger).join(`, `),
  actors: getRandomElements(Array.from(namesPeople), 3, getRandomInteger).join(`, `),
  releaseDate: getRandomDate(),
  country: Array.from(countries)[Math.floor(Math.random() * 4)],
  age: `${getRandomInteger(21)}+`,
  poster: posters[getRandomInteger(6)],
});

const getComment = () => ({
  id: getRandomString(3),
  idFilm: null,
  comment: getDescriptionFilm(description),
  author: Array.from(namesPeople)[getRandomInteger(Array.from(namesPeople).length-1)],
  date: `${getRandomInteger(10, 2)} days ago`,
  emotion: emojis[getRandomInteger(0, 3)],
});

for(let i = 0; i < MOVIE_LENGTH; i++ ) {
  movie.push(generateMovie());
  movie[i] = {...movie[i], name: Array.from(filmNames)[i], originalName: Array.from(filmNames)[i]};
}
console.log(movie)

const comments = generateComments(movie, getComment);

const countWatched = getCountFilms(movie, `watched`);

const filters = [
  {
    title: `All movies`,
    count: MOVIE_LENGTH,
    link: `#`,
  },
  {
    title: `Watchlist`,
    count: getCountFilms(movie, `watchlist`),
    link: `Watchlist`,
  },
  {
    title: `History`,
    count: countWatched,
    link: `history`,
  },
  {
    title: `Favorites`,
    count: getCountFilms(movie, `favorite`),
    link: `favorites`,
  },
];

export {movie, comments, filters, countWatched};
