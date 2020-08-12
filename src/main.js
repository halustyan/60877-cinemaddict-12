import {createMenuIcon} from './view/menu.js';
import {createmainNavigationIndexHtml} from './view/navigation.js';
import {createButtonShowMore} from './view/button-show-more.js';
import {renderFilmCard} from './view/film-card.js';
import {renderFilmPopUp} from './view/film-details.js';
import {generateFilms} from "./mock/film.js";

const films = generateFilms(); // отрисовываем карточки
let navigationChecked = {
  watchlist: 0,
  favorites: 0,
  history: 0,
};

for (let key in films) {
  if ((key.watchlist === `checked`)) {
    navigationChecked.watchlist++;
  }
  if ((key.favorites === `checked`)) {
    navigationChecked.favorites++;
  }
  if ((key.watched === `checked`)) {
    navigationChecked.history++;
  }
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

let renderCount = 5;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const createSiteUserIcon = document.querySelector(`.header`);

render(createSiteUserIcon, createMenuIcon(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);

render(siteMainElement, createmainNavigationIndexHtml(), `afterbegin`);

const createFilmCardsDiv = document.querySelector(`.films-list .films-list__container`);

for (let i = 0; i < 5; i++) {
  render(createFilmCardsDiv, renderFilmCard(), `afterbegin`);
}

const createFilmCardsDivExtra = document.querySelector(`.films-list--extra .films-list__container`);

for (let i = 0; i < 2; i++) {
  render(createFilmCardsDivExtra, renderFilmCard(), `afterbegin`);
}

const createFilmCardsDivExtraSecond = document.querySelector(`.films-list__container--second`);

for (let i = 0; i < 2; i++) {
  render(createFilmCardsDivExtraSecond, renderFilmCard(), `afterbegin`);
}

const createFooterStatistics = () => {
  return (
    `<p>130 291 movies inside</p>`
  );
};

const createFilmStatistics = document.querySelector(`.footer__statistics`);

render(createFilmStatistics, createFooterStatistics(), `afterbegin`);

const createFooterPopUp = document.querySelector(`.footer`);

render(createFooterPopUp, renderFilmPopUp(), `afterend`);

const createButtonShowMoreDiv = document.querySelector(`.films .films-list`);

render(createButtonShowMoreDiv, createButtonShowMore(), `beforeend`);

