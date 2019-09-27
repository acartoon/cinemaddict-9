import MovieList from "../components/movie-list";
import {render, unrender, Position, getComments} from '../utils.js';
import Movie from '../components/movie';
import MovieDetails from '../components/movie-details.js';
import BtnShowMore from "../components/btn-show-more";
import MovieContainer from "../components/movie-container";
import Sort from "../components/sort";

export default class PageController {
  constructor(container, movieData, commentsData) {
    this._container = container;
    this._movieData = movieData;
    this._commentsData = commentsData;
    this._allFilmsList = new MovieList(false, `All movies. Upcoming`);
    this._topRatedFilmsList = new MovieList(true, `Top rated`);
    this._mostCommentedFilmsList = new MovieList(true, `Most commented`);
    this._movieContainer = new MovieContainer();
    this._sort = new Sort(this.onSortClick.bind(this));
    this._MAIN_BLOCK_LENGTH = 5;
    this._movieToRender = null;
    this._SIDE_BLOCK_LENGTH = 2;
    this._btnShowMore = new BtnShowMore(this._onBtnClick.bind(this));
  }

  init() {
    render(this._container.querySelector(`.main`), this._sort.getElement(), Position.BEFOREEND);
    render(this._container.querySelector(`.main`), this._movieContainer.getElement(), Position.BEFOREEND);

    this._movieToRender = (this._movieData.length < this._MAIN_BLOCK_LENGTH) ? this._movieData.length : this._MAIN_BLOCK_LENGTH;
    this._renderMovieList(this._allFilmsList, this._movieData.slice(0, this._movieToRender));
    this._renderMovieList(this._topRatedFilmsList, this._sortingMovieToRated().slice(0, this._SIDE_BLOCK_LENGTH));
    this._renderMovieList(this._mostCommentedFilmsList, this._sortingMovieToComments().slice(0, this._SIDE_BLOCK_LENGTH));
    render(this._allFilmsList.getElement(), this._btnShowMore.getElement(), Position.BEFOREEND);
  }

  _renderMovieBoard(data, container) {
    data.forEach((i) => this._renderMovie(i, getComments(this._commentsData, i.id), container));
  }

  _sortingMovieToComments() {
    let commentsDataOnMovie = this._movieData.map((i) => getComments(this._commentsData, i.id));
    let sortingCommentsDataOnMovie = commentsDataOnMovie.slice().sort((a, b) => b.length - a.length);
    let sortingMovieID = sortingCommentsDataOnMovie.map((i) => i[0].idFilm);

    const movieData = sortingMovieID.reduce((movie, i) => {
      for (let a = 0; a < this._movieData.length; a++) {
        if (i === this._movieData[a].id) {
          movie.push(this._movieData[a]);
        }
      }
      return movie;
    }, []);
    return movieData;
  }

  _sortingMovieToRated() {
    return this._movieData.slice().sort((a, b) => b.rating - a.rating);
  }

  _renderMovieList(movieList, data) {
    render(this._movieContainer.getElement(), movieList.getElement(), Position.BEFOREEND);
    const container = movieList.getElement().querySelector(`.films-list__container`);
    this._renderMovieBoard(data, container);
  }

  _renderMovie(movieData, commentsData, container) {
    const movieComponent = new Movie(commentsData, movieData);
    const movieDetailsComponent = new MovieDetails(commentsData, movieData);
    const openMovieDetails = [`.film-card__poster`, `.film-card__title`, `.film-card__comments`];

    const renderMovieDetails = () => {
      render(this._container, movieDetailsComponent.getElement(), Position.BEFOREEND);
      document.addEventListener(`keydown`, onEscKeyDown);

      const commentInput = movieDetailsComponent.getElement()
        .querySelector(`.film-details__comment-input`);

        commentInput.addEventListener(`focus`, () => {
          document.removeEventListener(`keydown`, onEscKeyDown);
        });

        commentInput.addEventListener(`blur`, () => {
            document.addEventListener(`keydown`, onEscKeyDown);
          })

      movieDetailsComponent.getElement()
        .querySelector(`.film-details__close-btn`)
          .addEventListener(`click`, unrenderMovieDetails);
    };

    const unrenderMovieDetails = () => {
      unrender(movieDetailsComponent.getElement());
      movieDetailsComponent.removeElement();
    };
    
    openMovieDetails.forEach((i) => {
      movieComponent.getElement()
      .querySelector(i)
      .addEventListener(`click`, renderMovieDetails);
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        unrenderMovieDetails();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };
    render(container, movieComponent.getElement(), Position.BEFOREEND);
  }

  _onBtnClick(evt) {
    evt.preventDefault();
    const movieData = this._movieData.slice(this._movieToRender, this._movieToRender + this._MAIN_BLOCK_LENGTH);
    this._movieToRender += this._MAIN_BLOCK_LENGTH;

    this._renderMovieBoard(movieData, this._allFilmsList.getElement().querySelector(`.films-list__container`));

    if (this._movieData.length <= this._movieToRender) {
      this._btnShowMore.getElement().classList.add(`visually-hidden`);
    }
  }

  onSortClick(sortType) {
    const container = this._allFilmsList.getElement().querySelector(`.films-list__container`);
    container.innerHTML = ``;

    const movieDataToRender = {
      'date': this._movieData.slice(0, this._movieToRender).sort((a, b) => a.releaseDate - b.releaseDate),
      'rating': this._sortingMovieToRated().slice(0, this._movieToRender),
      'default': this._movieData.slice(0, this._movieToRender),
    }
    this._renderMovieBoard(movieDataToRender[sortType], container);
  }
}
