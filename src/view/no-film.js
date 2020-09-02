import AbstractView from "./abstract.js";

const createNoFIlmTemplate = () => {
  return `<p class="films-list__title">
  There are no movies in our database
  </p>`;
};

export default class NoFilmView extends AbstractView {
  getTemplate() {
    return createNoFIlmTemplate();
  }

}
