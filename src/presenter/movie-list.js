import ButtonShowMore from "../view/button-show-more.js";
import SortTemplate from "../view/sort-films.js";
import FilmsTemplate from "../view/films.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import NoFilmView from "../view/no-film.js";
import {SortType, UpdateType, UserAction} from "../const.js";
import FilmPresenter from "./film.js";
import {sortFilmDate, sortFilmRating} from "../utils/film.js";
import {updateItem} from "../utils/common.js";
import {filter} from "../utils/filter.js";
import FilmPopupTemplate from "../view/film-popup.js";

const FILM_COUNT_STEP = 5;

export default class MovieList {
  constructor(filmContainer, filmsModel, filterModel) {

    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._SortTemplateComponent = new SortTemplate();
    this._containerFilms = filmContainer;
    this._renderedMovieCount = FILM_COUNT_STEP;
    this._filmsComponent = new FilmsTemplate();
    this._sortComponent = null;
    this._noMovies = new NoFilmView();
    this._ShowMoreButton = null;
    this._currentSortType = SortType.DEFAULT;
    this._filmContainer = filmContainer;
    this._filmPresenter = {};
    //this._filmPopupComponent = new FilmPopupTemplate(film);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handlePopupChange = this._handlePopupChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

  }

  init() {
    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._renderFilmList();

  }

  /*setClickHandlerWatchlist(callback) {
    this._callback.clickWatchlist = callback;

    this._filmPopupComponent.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._clickHandlerWatchlist);
  }
  setClickHandlerWatched(callback) {
    this._callback.clicWatched = callback;
    this._filmPopupComponent.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._clickHandlerWatched);
  }
  setClickHandlerFavorite(callback) {
    this._callback.clickFavorite = callback;
    this._filmPopupComponent.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._clickHandlerFavorite);
  }*/
  /*_handleModeChange() {

  }*/
  /*_sortChangeColor() {
   for (let i = 0; i< this._SortTemplateComponent.getElement().querySelectorAll(".sort__button").length; i++ ) {
    this._SortTemplateComponent.getElement().querySelectorAll(".sort__button")[i].onclick = function(){
      this.classList.toggle("sort__button--active");
    }
    }
  }*/

  _sortFilms(sortType) {
    switch (sortType) {
      case sortType.DATE_UP:
        this._films.sort(sortFilmDate);
        break;
      case sortType.RATING:
        this._films.sort(sortFilmRating);
        break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _boardTasks исходный массив
        this._films = this._sourceFilms.slice();
    }
    this._currentSortType = sortType;

    //this._SortTemplateComponent.getTemplate().querySelector(".sort__button").classList.add(".NU");
  }

  _handleSortTypeChange(sortType) {
    console.log(sortType);
    if (this._currentSortType === sortType) {
      return;
    }
    /*this._sortFilms(sortType);*/
    this._currentSortType = sortType;
    this._clearFilmList();
    this._renderFilmList();
  }

  _openPopUpFilm() {
    this._setClickHandler
  }

  _handlePopupChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.closeItemPopup());
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._sourceFilms = updateItem(this._sourceFilms, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
    }
  }


  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    remove(this._ShowMoreButton);
    remove(this._sortComponent);
    this._renderedMovieCount = FILM_COUNT_STEP;
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortTemplate(this._currentSortType);
    render(this._containerFilms, this._sortComponent.getElement(), RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilm(film) {
    const filmListElement = this._filmsComponent.getElement().querySelector(`.films-list__container`);
    const filmPresenter = new FilmPresenter(filmListElement, this._handleViewAction, this._handlePopupChange);
    //const filmPresenter = new FilmPresenter(filmListElement, this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderNoMovies() {
    render(this._containerFilms, this._noMovies, RenderPosition.AFTERBEGIN);
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearFilmList();
        this._renderFilmList();
        break;
      case UpdateType.MAJOR:
        this._clearFilmList();
        this._renderFilmList();
        break;
    }
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(film));
  }

  _renderNoFilms() {
    const fileListElement = this._filmContainer.querySelector(`.films-list__container`);
    render(fileListElement, this._NoFilmViewComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilmList() {
    this._renderSort();
    render(this._containerFilms, this._filmsComponent.getElement(), RenderPosition.BEFOREEND);
    const films = this._getFilms();
    const filmCount = films.length;

    this._renderFilms(films.slice(0, Math.min(filmCount, FILM_COUNT_STEP)));
    if (filmCount > FILM_COUNT_STEP) {
      this._renderLoadMoreButton();
    }

  }

  _renderFilmsElements() {
    this._renderSort();
    this._renderFilmList();
  }

  _handleLoadMoreButtonClick() {
    const films = this._getFilms();
    const filmCount = films.length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedMovieCount + FILM_COUNT_STEP);
    this._renderFilms(films.slice(this._renderedMovieCount, newRenderedFilmCount));
    this._renderedMovieCount = newRenderedFilmCount;
    if (this._renderedMovieCount >= filmCount) {
      this._ShowMoreButton.getElement().remove();
    }
  }


  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filteredFilms = filter[filterType](films);
    switch (this._currentSortType) {
      case SortType.DATE_UP:
        return filteredFilms.sort(sortFilmDate);
      case SortType.RATING:
        return filteredFilms.sort(sortFilmRating);
    }

    return filteredFilms;
  }

  _renderFilmsList() {
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }
    this._renderFilmList();
  }

  _renderLoadMoreButton() {
    if (this._ShowMoreButton !== null) {
      this._ShowMoreButton = null;
    }
    this._ShowMoreButton = new ButtonShowMore();

    render(this._containerFilms, this._ShowMoreButton, RenderPosition.BEFOREEND);
    this._ShowMoreButton.setClickHandler(this._handleLoadMoreButtonClick.bind(this));
  }

  destroy() {
    this._clearFilmList();
    this._filmsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
    remove(this._filmsComponent);
  }
}
