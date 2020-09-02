const FILM_COUNT_STEP = 5;
import ButtonShowMore from "../view/button-show-more.js";
import SortTemplate from "../view/sort-films.js";
import FilmsTemplate from "../view/films.js";
import {render, RenderPosition, remove, footerElement} from "../utils/render.js";
import NoFilmView from "../view/no-film.js";
import {SortType} from "../const.js";
import FilmTemplate from "../view/film.js";
import FilmPopupTemplate from "../view/film-popup.js";

export default class MovieList {
  constructor(filmContainer) {
    this._filmContainer = filmContainer;
    this._renderedFilmCount = FILM_COUNT_STEP;
    this._sortComponent = new SortTemplate();
    this._ButtonShowMoreComponent = new ButtonShowMore();
    this._FilmsTemplateComponent = new FilmsTemplate();
    this._NoFilmViewComponent = new NoFilmView();
    this.__renderedFilmCountStep = FILM_COUNT_STEP;
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._currentSortType = SortType.DEFAULT;
    this._FilmPopupTemplateComponent = new FilmPopupTemplate();
    this._FilmTemplateComponent = new FilmTemplate();
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
    this._filmContainer.querySelector(`.films-list__container`).innerHTML = ``;
    this._renderedFilmCount = FILM_COUNT_STEP;
  }

  _renderSort() {
    render(this._filmContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilm(filmListElement, film) {
    const filmComponent = new FilmTemplate(film);
    filmComponent.setClickHandler(() => {
      const filmPopupComponent = new FilmPopupTemplate(film);
      render(footerElement, filmPopupComponent, RenderPosition.BEFOREEND);
      filmPopupComponent.setClickHandler((evt) => {
        const target = evt.target;
        if (target.classList.contains(`film-details__close-btn`)) {
          filmPopupComponent.getElement().remove();
        }
      });
      filmPopupComponent.setEscKeyDownHandler((evt) => {
        if (evt.key === `Escape` || evt.key === `Esc`) {
          evt.preventDefault();
          filmPopupComponent.getElement().remove();
        }
      });
    });

    render(filmListElement, filmComponent, RenderPosition.BEFOREEND);
  }

  _renderFilms(from, to) {
    const filmsContainer = this._FilmsTemplateComponent.getElement().querySelector(`.films-list__container`);
    this._films.slice(from, to).forEach((film) => this._renderFilm(filmsContainer, film));
  }

  _renderNoFilms() {
    const fileListElement = this._filmContainer.querySelector(`.films-list__container`);
    render(fileListElement, this._NoFilmViewComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilmList() {
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

  _renderButtonShowMore() {
    const fileListElement = this._FilmsTemplateComponent.getElement().querySelector(`.films-list`);
    render(fileListElement, this._ButtonShowMoreComponent, RenderPosition.BEFOREEND);

    const buttonShow = this._ButtonShowMoreComponent;

    buttonShow.setEditClickHandler(this._handleLoadMoreButtonClick);
  }
}

export const sortFilmDate = (filmA, filmB) => {
  return filmA.year - filmB.year;
};

export const sortFilmRating = (filmA, filmB) => {
  return filmB.rating - filmA.rating;
};
