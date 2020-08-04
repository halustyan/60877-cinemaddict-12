'use strict';

import { createMenuIcon } from './view/menu.js';

import { createmainNavigationIndexHtml } from './view/navigation.js';

import { createButtonShowMore } from './view/buttonShowMore.js';

import { renderFilmCard } from './view/filmCard.js';

import { renderFilmPopUp } from './view/filmDetails.js';

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
