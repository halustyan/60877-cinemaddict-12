import ButtonShowMore from "../view/button-show-more.js";
import SortTemplate from "../view/sort-films.js";
import FilmsTemplate from "../view/films.js";
import {render, RenderPosition, remove, footerElement} from "../utils/render.js";
import NoFilmView from "../view/no-film.js";
import {SortType} from "../const.js";
import FilmPresenter from "./film.js";
import FilmTemplate from "../view/film.js";
import {sortFilmDate, sortFilmRating} from "../utils/common.js";
import {updateItem} from "../utils/common.js";

const FILM_COUNT_STEP = 5;

export default class MovieList {
  constructor(filmContainer) {
    this._filmContainer = filmContainer;
    this._renderedFilmCount = FILM_COUNT_STEP;
    this._FilmTemplateComponent = new FilmTemplate();
    this._sortComponent = new SortTemplate();
    this._ButtonShowMoreComponent = new ButtonShowMore();
    this._FilmsTemplateComponent = new FilmsTemplate();
    this._NoFilmViewComponent = new NoFilmView();
    /*this.__renderedFilmCountStep = FILM_COUNT_STEP;*/
    this._filmContainer = filmContainer;
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handlePopupChange = this._handlePopupChange.bind(this);
    this._currentSortType = SortType.DEFAULT;
    this._filmPresenter = {};
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(films) {
    this._films = films;
    this._renderSort();
    render(this._filmContainer, this._FilmsTemplateComponent, RenderPosition.BEFOREEND);
    this._renderFilmsList();
    this._renderButtonShowMore();
    this._filmsnew = films.slice();
    this._sourcedFilms = films.slice();
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._films.sort(sortFilmDate);
        break;
      case SortType.RATING:
        this._films.sort(sortFilmRating);
        break;
      default:
        this._films = this._sourcedFilms.slice();
    }
    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderFilmList();
  }

  _clearFilmList() {
    Object
    .values(this._filmPresenter)
    .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedMovieCount = FILM_COUNT_STEP;
  }

  _renderSort() {
    render(this._filmContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilm(film) {

    const filmPresenter = new FilmPresenter(this._FilmsTemplateComponent.getElement().querySelector(".films-list__container"), this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._sourceFilms = updateItem(this._sourceFilms, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _handleModeChange(){

  }

  _renderNoMovies() {
    renderElement(this._containerFilms, this._noMovies, RenderPosition.AFTERBEGIN);
  }

  _handlePopupChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.closeItemPopup());
  }

  _renderFilms(from, to) {
    this._films.slice(from, to).forEach((film) => this._renderFilm(film));
  }

  _renderNoFilms() {
    const fileListElement = this._filmContainer.querySelector(`.films-list__container`);
    render(fileListElement, this._NoFilmViewComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilmList() {
    render(this._filmContainer, this._FilmsTemplateComponent, RenderPosition.BEFOREEND);
    this._renderFilms(0, Math.min(this._films.length, FILM_COUNT_STEP));
    if (this._films.length > FILM_COUNT_STEP) {
      this._renderButtonShowMore();
    }
  }

  _renderFilmsList() {
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }
    this._renderFilmList();
  }

  _handleLoadMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_STEP);
    this._renderedFilmCount += FILM_COUNT_STEP;
    if (this._renderedFilmCount >= this._films.length) {
      remove(this._ButtonShowMoreComponent);
    }
  }

  _renderLoadMoreButton() {
    renderElement(this._containerFilms, this._ShowMoreButton.getElement(), RenderPosition.BEFOREEND);
    this._ShowMoreButton.setClickHandler(this._handleLoadMoreButtonClick.bind(this));
  }

  _renderButtonShowMore() {
    const fileListElement = this._FilmsTemplateComponent.getElement().querySelector(`.films-list`);
    render(fileListElement, this._ButtonShowMoreComponent, RenderPosition.BEFOREEND);

    const buttonShow = this._ButtonShowMoreComponent;

    buttonShow.setEditClickHandler(this._handleLoadMoreButtonClick);
  }

  destroy() {
    remove(this._filmComponent);
  }

}


