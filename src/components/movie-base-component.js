import {AbstractComponent} from './abstract-component.js';

export default class MovieBaseComponent extends AbstractComponent {
  constructor(comments, {id, name, genres, rating, ownrating, runtime,
    description, watchlist, watched, favorite, releaseDate, poster, originalName, director, writers, actors, country, age}) {
    super();
    this._id = id;
    this._comments = comments;
    this._name = name;
    this._genres = genres;
    this._rating = rating;
    this._ownrating = ownrating;
    this._runtime = runtime;
    this._description = description;
    this._watchlist = watchlist;
    this._watched = watched;
    this._favorite = favorite;
    this._releaseDate = releaseDate;
    this._poster = poster;
    this._originalName = originalName;
    this._director = director;
    this._writers = writers;
    this._actors = actors;
    this._country = country;
    this._age = age;
    this._element = null;
  }
}
