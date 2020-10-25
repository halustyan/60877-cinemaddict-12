import {render, RenderPosition, footerElement, remove, replace} from "../utils/render.js";
import FilmPopupTemplate from "../view/film-popup.js";
import FilmTemplate from "../view/film.js";
import {UserAction, UpdateType} from "../const.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  POPUP: `POPUP`
};

export default class FIlmPresenter {
  constructor(filmListContainer, changeData, handlePopupChange) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._handlePopupChange = handlePopupChange;
    this._filmComponent = null;
    this._filmEditComponent = null;
    this._mode = Mode.DEFAULT;
    this._clickWatchlist = this._clickWatchlist.bind(this);
    this._clickWatched = this._clickWatched.bind(this);
    this._clickFavorite = this._clickFavorite.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._openPopup = this._openPopup.bind(this);
    this._handlerCloseClick = this._handlerCloseClick.bind(this);
    this._handlerCloseKeyDown = this._handlerCloseKeyDown.bind(this);
  }

  init(film) {
    this._film = film;
    const prevFilmComponent = this._filmComponent;
    const prevFilmPopupComponent = this._filmPopupComponent;
    this._filmComponent = new FilmTemplate(film);
    this._filmPopupComponent = new FilmPopupTemplate(film);
    this._filmComponent.setClickHandler(this._openPopup);


    this._filmComponent.setClickHandlerWatchlist(this._clickWatchlist);
    this._filmComponent.setClickHandlerWatched(this._clickWatched);
    this._filmComponent.setClickHandlerFavorite(this._clickFavorite);

    if (prevFilmComponent === null || prevFilmPopupComponent === null) {
      render(this._filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filmComponent, prevFilmComponent);
    replace(this._filmPopupComponent, prevFilmPopupComponent);
    console.log(this._mode);
    if (this._mode===Mode.POPUP) {
      this._renderPopup();
    }
    remove(prevFilmComponent);
    remove(prevFilmPopupComponent);

  }

  _clickWatchlist() {
    // console.log(this._film);
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              watchlist: !this._film.watchlist
            }
        )
    );
  }

  _clickHandlerWatchlist(evt) {
    evt.preventDefault();

    this._callback.clickWatchlist(evt);

  }

  _clickWatched() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              watched: !this._film.watched
            }
        )
    );
  }

  _clickFavorite() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              favorites: !this._film.favorites
            }
        )
    );
  }

  closeItemPopup() {
    this._closePopup();
  }

  _openPopup(evt) {
    if (evt.target.classList.contains(`film-card__controls-item`)) {
      return;
    }
    this._renderPopup();
  }

  _renderPopup() {
    this._mode = Mode.POPUP;
    this._handlePopupChange();

    this._filmPopupComponent.setClickHandlerWatchlist(this._clickWatchlist);
    this._filmPopupComponent.setClickHandlerWatched(this._clickWatched);
    this._filmPopupComponent.setClickHandlerFavorite(this._clickFavorite);

    this._filmPopupComponent.setEscKeyDownHandler(this._handlerCloseKeyDown);
    this._filmPopupComponent.setCloseHandler(this._handlerCloseClick);
    //this._filmPopupComponent.restoreHandlers();
    render(footerElement, this._filmPopupComponent, RenderPosition.BEFOREEND);
  }

  _handlerCloseClick() {
    this._closePopup();
  }

  _handlerCloseKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closePopup();
    }
  }

  _closePopup() {
    remove(this._filmPopupComponent);
    console.log(1);
    //this._mode = Mode.DEFAULT;
  }

  /*_renderFilmFunc() {
    render(this._FilmsTemplateComponent, this._filmComponent, RenderPosition.BEFOREEND);
  }*/

  destroy() {
    remove(this._filmComponent);
    remove(this._filmPopupComponent);
  }
}
