import {createElement} from "../utils.js";

const createNoFIlmTemplate = () => {
  return `<p class="films-list__title">
  There are no movies in our database
  </p>`;
};

export default class NoFilmView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoFIlmTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
