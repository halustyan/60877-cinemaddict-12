import AbstractView from "./abstract.js";
const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ButtonShowMore extends AbstractView{
  constructor() {
    super();

    this._clickHandler = this._clickHandler.bind(this);
    this._editClickHandler = this._editClickHandler.bind(this);
  }
  getTemplate() {
    return createShowMoreButtonTemplate();
  }
  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.films-list__show-more`).addEventListener(`click`, this._editClickHandler);
  }
}
