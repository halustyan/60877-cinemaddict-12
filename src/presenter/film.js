import FilmTemplate from "../view/film.js";
import {render, RenderPosition, footerElement, remove} from "../utils/render.js";
import FilmsTemplate from "../view/films.js";
import FilmPopupTemplate from "../view/film-popup.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  POPUP: `POPUP`
};

export default class FIlmPresenter {
  constructor(filmListContainer, changeData) {
    this._changeData = changeData;
    this._filmListContainer = filmListContainer;

    this._clickWatchlist = this._clickWatchlist.bind(this);
    this._clickWatched = this._clickWatched.bind(this);
    this._clickFavorite = this._clickFavorite.bind(this);

    this._FilmsTemplateComponent = new FilmsTemplate();
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._filmComponent = null;
    this._filmPopupComponent = null;
  }

  init(film) {
    this._film = film;
    const prevfilmComponent = this._filmComponent;
    const prevfilmEditComponent = this._filmEditComponent;
    this._filmComponent = new FilmTemplate(film);
    this._filmPopupComponent = new FilmPopupTemplate(film);

    this._filmPopupComponent.setWatchlistClickHandler(this._clickWatchlist);
    this._filmPopupComponent.setWatchedClickHandler(this._clickWatched);
    this._filmPopupComponent.setFavoriteClickHandler(this._clickFavorite);

    this._filmComponent.setClickHandler(() => {
      render(footerElement, this._filmPopupComponent, RenderPosition.BEFOREEND);
      this._filmPopupComponent.setClickHandler((evt) => {
        const target = evt.target;
        if (target.classList.contains(`film-details__close-btn`)) {
          this._filmPopupComponent.getElement().remove();
        }
      });
      this._filmPopupComponent.setEscKeyDownHandler((evt) => {
        if (evt.key === `Escape` || evt.key === `Esc`) {
          evt.preventDefault();
          this._filmPopupComponent.getElement().remove();
        }
      });
    });

    if (prevfilmComponent === null || prevfilmEditComponent === null) {
      render(this._filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }
  }

  _escKeyDownHandler() {

  }
  _clickWatchlist() {
    this._changeData(
        Object.assign({},
            this._film, {
              watchlist: !this._film.watchlist
            }
        )
    );
  }

  _clickWatched() {
    this._changeData(
        Object.assign({},
            this._film, {
              watched: !this._film.watched
            }
        )
    );
  }

  _clickFavorite() {
    this._changeData(
        Object.assign({},
            this._film, {
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
    this._mode = Mode.POPUP;
    this._handlePopupChange();
    this._filmPopupComponent.setClickHandler(this._handlerCloseClick);
    this._filmPopupComponent.restoreHandlers();
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

  _filmComponentSetClickHandler() {
    this._filmComponent.setClickHandler(() => {

      render(footerElement, this._filmPopupComponent, RenderPosition.BEFOREEND);
      this._filmPopupComponent.setClickHandler((evt) => {
        const target = evt.target;
        if (target.classList.contains(`film-details__close-btn`)) {
          this._filmPopupComponent.getElement().remove();
        }
      });
    });
  }

  _filmPopUpComponentSetEscKeyDownHandler() {
    this._filmPopupComponent.setEscKeyDownHandler((evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        this._filmPopupComponent.getElement().remove();
      }
    });
  }

  _closePopup() {
    remove(this._filmPopupComponent);
    this._mode = Mode.DEFAULT;

  }

  _renderFilmFunc() {
    render(this._FilmsTemplateComponent, this._filmComponent, RenderPosition.BEFOREEND);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmPopupComponent);
  }
}
