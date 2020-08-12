import {createProfileTemplate} from './view/avatar.js';
import {createNavigationTemplate} from "./view/search.js";
import {createSortTemplate} from "./view/sort-films.js";
import {createFilmsTemplate} from "./view/films.js";
import {createFilmTemplate} from "./view/film.js";
import {generateFilms} from "./mock/film.js";
import {createShowMoreButtonTemplate} from './view/button-show-more.js';
import {createTopRatedTemplate} from './view/top-rate.js';
import {createMostCommentedTemplate} from "./view/most-comment.js";
import {createFilmPopupTemplate} from "./view/film-popup.js";

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const films = generateFilms();

let navigationChecked = {
  watchlist: 0,
  favorites: 0,
  history: 0,
};

films.forEach((film) => {
  if ((film.watchlist === `checked`)) {
    navigationChecked.watchlist++;
  }
  if ((film.favorites === `checked`)) {
    navigationChecked.favorites++;
  }
  if ((film.watched === `checked`)) {
    navigationChecked.history++;
  }
});

render(siteHeaderElement, createProfileTemplate(), `beforeend`);
render(siteHeaderElement, createNavigationTemplate(navigationChecked), `afterend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsTemplate(), `beforeend`);

const FilmListElement = siteMainElement.querySelector(`.films-list .films-list__container`);

for (let i = 0; i < 5; ++i) {
  const filmTemplate = createFilmTemplate(films[i]);
  render(FilmListElement, filmTemplate, `beforeend`);
}

const generateFiveElement = (lineCount) => {
  for (let i = lineCount; i < lineCount + 5; ++i) {
    const filmTemplate = createFilmTemplate(films[i]);
    render(FilmListElement, filmTemplate, `beforeend`);
  }
  lineCount += 5;
  if (lineCount >= films.length) {
    buttonShow.remove();
  }
  return lineCount;
};

render(siteMainElement, createShowMoreButtonTemplate(), `beforeend`);
render(siteMainElement, createTopRatedTemplate(), `beforeend`);
render(siteMainElement, createMostCommentedTemplate(), `beforeend`);
render(footerElement, createFilmPopupTemplate(films[0]), `afterend`);

let renderCount = 5;

const buttonShow = document.querySelector(`.films-list__show-more`);
buttonShow.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  renderCount = generateFiveElement(renderCount);
});
