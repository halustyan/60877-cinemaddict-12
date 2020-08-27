const FILM_COUNT_STEP = 5;
import ButtonShowMore from "../view/button-show-more.js"
import SortTemplate from "../view/sort-films.js"
import FilmsTemplate from "../view/films.js"
import {render, RenderPosition} from "../utils/render.js"
import NoFilmView from "../view/no-film.js"

export default class MovieList {
 constructor (filmContainer) {
  this._filmContainer = filmContainer;
  this._renderedFilmCount = FILM_COUNT_STEP;
  this._sortComponent = new SortTemplate ();
  this._ButtonShowMoreComponent = new ButtonShowMore ();
  this._FilmsTemplateComponent = new FilmsTemplate();
  this._NoFilmViewComponent = new NoFilmView();
 }

 init (films) {
  this._films = films;
 }

 _renderSort() {
   render(this._filmContainer, this._sortComponent, RenderPosition.BEFOREEND);
 }

 _renderFilm(filmListElement, film) {
  const filmComponent = new FilmTemplate(film);
  const filmPopupComponent = new FilmPopupTemplate(film);
  render(filmListElement, filmComponent, RenderPosition.BEFOREEND);
 }

 _renderFilms(from, to) {
  const filmsContainer = this._FilmsTemplateComponent.querySelector(".films-list__container");
  this._films.slice(from, to).forEach((film) => this._renderFilm(filmsContainer, film));
 }

 _renderNoFilms() {
  const fileListElement = this._filmContainer.querySelector(`.films-list__container`);
  render(fileListElement, this._NoFilmViewComponent, RenderPosition.AFTERBEGIN);
}

_renderFilmList() {
  _renderFilms(1, Math.min(this._films.length, FILM_COUNT_STEP));
}

_renderFilmsList () {
  if (this._films.length === 0) {
    _renderNoFilms();
    return;
  }
}

_renderButtonShowMore() {
  const fileListElement = this._filmContainer.querySelector(`.films-list__container`);
  render(fileListElement, ButtonShowMoreComponent, RenderPosition.BEFOREEND);

  let renderCount = 5;

  const buttonShow = this._ButtonShowMoreComponent;

  buttonShow.setEditClickHandler(() => {
     evt.preventDefault();
     renderCount = generateFiveElement(renderCount);
  });
  }
}
