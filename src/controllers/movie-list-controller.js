import {getComments} from '../utils.js';
import MovieController from "./movie-controller";

export default class MovieListController {
  constructor(container, movieData, commentsData, onDataChange) {
    this._container = container;
    this._movieData = movieData;
    this._commentsData = commentsData;
    this._movieToRender = null;
    this._onDataChangeMain = onDataChange;
    this.onChangeView = this.onChangeView.bind(this);
    this._subscriptions = [];
  }

  init() {
    this._movieData.forEach((movie) => this._renderMovie(movie, this._container));
  }

  _renderMovie(movieData, container) {
    const movieController = new MovieController(movieData, getComments(this._commentsData, movieData.id), container, this.onDataChange.bind(this), this.onChangeView);
    movieController.init();
    this._subscriptions.push(movieController.setDefaultView);
  }

  onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }

  onDataChange(newData, oldData, movie, typeDataChange) {
    let movieId = ``;
    let dataChange = ``;

    if (typeDataChange === `comment`) {
      if (typeof newData === `string`) {
        const indexCommentsData = this._commentsData.findIndex((i) => i.id === newData);
        movieId = this._commentsData[indexCommentsData].idFilm;
        this._commentsData = [...this._commentsData.slice(0, indexCommentsData), ...this._commentsData.slice(indexCommentsData + 1)];
      } else {
        movieId = newData.idFilm;
        this._commentsData.push(newData);
      }
      dataChange = this._commentsData;
    } else if (typeDataChange === `userState`) {
      const index = this._movieData.findIndex((i) => i.id === oldData.id);
      this._movieData[index] = newData;
      movieId = newData.idFilm;
      dataChange = this._movieData;
    }
    movie.updateData(typeDataChange, getComments(this._commentsData, movieId));
    this._onDataChangeMain(dataChange, typeDataChange);
  }
}
