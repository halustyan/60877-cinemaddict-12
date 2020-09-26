import Smart from "./smart.js";
import {timeMinutesToHour, yearFormat, yearFormatComments} from "../utils/common.js";
import he from 'he';
import moment from 'moment';

const createPopupComments = (film) => {

  let textComments = ``;

  film.comments.forEach((comments) => {
    textComments += `<li class="film-details__comment">
                  <span class="film-details__comment-emoji">
                    <img src=${comments.emotion} width="55" height="55" alt="emoji">
                  </span>
                  <div>
                    <p class="film-details__comment-text">${comments.text}</p>
                    <p class="film-details__comment-info">
                      <span class="film-details__comment-author">${comments.author}</span>
                      <span class="film-details__comment-day">${yearFormatComments(comments.date)}</span>
                      <button class="film-details__comment-delete">Delete</button>
                    </p>
                  </div>
                </li>`;
  });
  return textComments;
};

const createFilmPopupTemplate = (film) => {
  return (
    `<section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="form-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">close</button>
            </div>
            <div class="film-details__info-wrap">
              <div class="film-details__poster">
                <img class="film-details__poster-img" src=${film.poster} alt="">
                <p class="film-details__age">18+</p>
              </div>
              <div class="film-details__info">
                <div class="film-details__info-head">
                  <div class="film-details__title-wrap">
                    <h3 class="film-details__title">${film.title}</h3>
                    <p class="film-details__title-original">Название: ${film.title}</p>
                  </div>
                  <div class="film-details__rating">
                    <p class="film-details__total-rating">${film.rating}</p>
                  </div>
                </div>
                <table class="film-details__table">
                  <tr class="film-details__row">
                    <td class="film-details__term">Режиссер</td>
                    <td class="film-details__cell">${film.director}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Сценарист</td>
                    <td class="film-details__cell">${film.writers}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Актеры</td>
                    <td class="film-details__cell">${film.actors}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Год</td>
                    <td class="film-details__cell">${moment(film.date).format(`DD MMMM YYYY`)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Продолжительность</td>
                    <td class="film-details__cell">${timeMinutesToHour(film.duration)}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Страна</td>
                    <td class="film-details__cell">${film.country}</td>
                  </tr>
                  <tr class="film-details__row">
                    <td class="film-details__term">Жанр</td>
                    <td class="film-details__cell">
                      <span class="film-details__genre">${film.genre}</span>
                      </td>
                  </tr>
                </table>
                <p class="film-details__film-description">
                ${film.description}
                </p>
              </div>
            </div>
            <section class="film-details__controls">
              <input type="checkbox" class="film-details__control-input visually-hidden" ${film.watchlist ? `checked` : ``}  id="watchlist" name="watchlist">
              <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
              <input type="checkbox" class="film-details__control-input visually-hidden" ${film.watched ? `checked` : ``} id="watched" name="watched">
              <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
              <input type="checkbox" class="film-details__control-input visually-hidden" ${film.favorites ? `checked` : ``} id="favorite" name="favorite">
              <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
            </section>
          </div>
          <div class="form-details__bottom-container">
            <section class="film-details__comments-wrap">
              <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span></h3>
              <ul class="film-details__comments-list">
              `
    + createPopupComments(film) +

    `
              </ul>
              <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label" id="emoji">${film.emotion ? `<img src="${film.emotion}" width="55" height="55" alt="emoji-smile">` : ``}</div>
                <label class="film-details__comment-label">
                  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                </label>
                <div class="film-details__emoji-list">
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
                  <label class="film-details__emoji-label" for="emoji-smile">
                    <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                  </label>
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
                  <label class="film-details__emoji-label" for="emoji-sleeping">
                    <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                  </label>
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
                  <label class="film-details__emoji-label" for="emoji-gpuke">
                    <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                  </label>
                  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
                  <label class="film-details__emoji-label" for="emoji-angry">
                    <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                  </label>
                </div>
              </div>
            </section>
          </div>
        </form>
    </section>`
  );
};

export default class FilmPopupTemplate extends Smart {
  constructor(film) {
    super();
    this._data = film;
    this._escCallback = {};
    this._clickHandler = this._clickHandler.bind(this);
    this._callback = {};
    this._clickHandlerDelete = this._clickHandlerDelete.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._emojiChangeHandler = this._emojiChangeHandler.bind(this);
    this._pressHandlerAdd = this._pressHandlerAdd.bind(this);
    this._setInnerHandlers();
  }

  _clickWatchlist() {
    // console.log(this._film);
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
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
  setClickHandlerWatchlist(callback) {
    this._callback.clickWatchlist = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._clickHandlerWatchlist);
  }
  _clickHandlerWatched(evt) {
    evt.preventDefault();
    this._callback.clicWatched(evt);
  }
  setClickHandlerWatched(callback) {
    this._callback.clicWatched = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._clickHandlerWatched);
  }
  _clickHandlerFavorite(evt) {
    evt.preventDefault();
    this._callback.clickFavorite(evt);
  }

  setClickHandlerFavorite(callback) {
    this._callback.clickFavorite = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._clickHandlerFavorite);
  }

  _clickWatched() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
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
        UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            {
              favorites: !this._film.favorites
            }
        )
    );
  }

  _watchedClickHandler() {
    this.updateData({
      watched: !this._data.watched
    });
  }

  getTemplate() {
    return createFilmPopupTemplate(this._data);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _watchlistClickHandler(evt) {
    this.updateData({
      watchlist: !this._data.watchlist
    });
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`#watchlist`).addEventListener(`change`, this._watchlistClickHandler);

  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._editClickHandler);
  }

  _clickHandler(evt) {
    this._callback.click(evt);
  }

  setClickHandler(callback) {

    this._callback.click = callback;
    // 2. В addEventListener передадим абстрактный обработчик
    this.getElement().addEventListener(`click`, this._clickHandler);
  }

  _escKeyDownHandler(evt) {
    // 3. А внутри абстрактного обработчика вызовем колбэк
    this._callback.keydown(evt);
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._emojiChangeHandler);
    this.getElement().querySelector(`.film-details__comments-list`).addEventListener(`click`, this._clickHandlerDelete);
    this.getElement().querySelector(`#watchlist`).addEventListener(`change`, this._watchlistClickHandler);
    this.getElement().querySelector(`#watched`).addEventListener(`click`, this._watchedClickHandler);
    this.getElement().querySelector(`#favorite`).addEventListener(`click`, this._favoriteClickHandler);
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`keydown`, this._pressHandlerAdd);

    // this.setCloseHandler(this._callback.click);

  }

  setEscKeyDownHandler(callback) {
    this._callback.keydown = callback;
    // 2. В addEventListener передадим абстрактный обработчик
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _emojiChangeHandler(evt) {
    // console.log(evt.target.value);
    evt.preventDefault();
    this.updateData({
      emotion: evt.target.value,
    });
  }

  _watchedClickHandler(evt) {
    this.updateData({
      watched: !this._data.watched
    });
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`#watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  _favoriteClickHandler() {
    this.updateData({
      favorites: !this._data.favorites
    });
  }

  _clickHandlerDelete(evt) {
    if (!evt.target.classList.contains(`film-details__comment-delete`)) {
      return;
    }
    evt.preventDefault();
    const commentIndex = this._data.comments.findIndex((item) => item.id === parseInt(evt.target.dataset.id, 10));
    const comments = [
      ...this._data.comments.slice(0, commentIndex),
      ...this._data.comments.slice(commentIndex + 1),
    ];
    this.updateData({
      comments
    });

  }

  _pressHandlerAdd(evt) {
    if (evt.ctrlKey && parseInt(evt.keyCode, 10) === 13) {
      evt.preventDefault();
      const idComment = this._data.comments[this._data.comments.length - 1].id + 1;
      const newComment = {
        id: idComment,
        text: he.encode(evt.target.value),
        emotion: `/images/emoji/${this._data.emotion}.png`,
        author: `User`,
        date: moment().format(`YYYY/MM/DD hh:mm`),

      };
      const comments = [
        ...this._data.comments.slice(), newComment,

      ];
      this.updateData({
        comments,
        emotion: null,
      });
    }

  }



  setCloseHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._clickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`#favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseHandler(this._callback.click);
  }

}
