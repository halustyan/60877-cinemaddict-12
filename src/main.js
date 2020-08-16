import SiteProfile from "./view/avatar.js";
import NavigationTemplate from "./view/search.js";
import SortTemplate from "./view/sort-films.js";
import FilmsTemplate from "./view/films.js";
import FilmTemplate from "./view/film.js";
import {generateFilms} from "./mock/film.js";
import ButtonShowMore from './view/button-show-more.js';
import TopRatedTemplate from './view/top-rate.js';
import MostCommentedTemplate from "./view/most-comment.js";
import FilmPopupTemplate from './view/button-show-more.js';
import {renderElement, RenderPosition} from "./utils.js";

const SiteProfileComponent = new SiteProfile();
const SortTemplateComponent = new SortTemplate();
const FilmsTemplateComponent = new FilmsTemplate();
const ButtonShowMoreComponent = new ButtonShowMore();
const TopRatedTemplateComponent = new TopRatedTemplate();
const MostCommentedTemplateComponent = new MostCommentedTemplate();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);

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


renderElement(siteHeaderElement, SiteProfileComponent.getElement(), RenderPosition.BEFOREEND);

renderElement(siteHeaderElement, new NavigationTemplate(navigationChecked).getElement(), RenderPosition.AFTEREND);

renderElement(siteMainElement, SortTemplateComponent.getElement(), RenderPosition.BEFOREEND);

renderElement(siteMainElement, FilmsTemplateComponent.getElement(), RenderPosition.BEFOREEND);

const FilmListElement = siteMainElement.querySelector(`.films-list .films-list__container`);

for (let i = 0; i < 5; ++i) {
  //const filmTemplate = createFilmTemplate(films[i]);
  const filmTemplate =  new FilmTemplate(films[i]);
  renderElement(FilmListElement, filmTemplate, `beforeend`);
}

const generateFiveElement = (lineCount) => {
  for (let i = lineCount; i < lineCount + 5; ++i) {
    const filmTemplate = createFilmTemplate(films[i]);
    renderElement(FilmListElement, filmTemplate, `beforeend`);
  }
  lineCount += 5;
  if (lineCount >= films.length) {
    buttonShow.remove();
  }
  return lineCount;
};

renderElement(siteMainElement, ButtonShowMoreComponent.getElement(), RenderPosition.BEFOREEND);

renderElement(siteMainElement, TopRatedTemplateComponent.getElement(),  RenderPosition.BEFOREEND);

renderElement(siteMainElement, MostCommentedTemplateComponent.getElement(), RenderPosition.BEFOREEND);

renderElement(footerElement, new FilmPopupTemplate(films[0]).getElement(), RenderPosition.AFTEREND);

let renderCount = 5;

const buttonShow = document.querySelector(`.films-list__show-more`);
buttonShow.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  renderCount = generateFiveElement(renderCount);
});
