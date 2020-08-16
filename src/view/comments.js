import {createElement} from "./utils.js";
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
                      <span class="film-details__comment-day">${comments.date}</span>
                      <button class="film-details__comment-delete">Delete</button>
                    </p>
                  </div>
                </li>`;
  });
  return textComments;
};

export default class PopUpComments {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createPopupComments();
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
