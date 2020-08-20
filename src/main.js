import SiteProfile from "./view/avatar.js";
import NavigationTemplate from "./view/search.js";
import SortTemplate from "./view/sort-films.js";
import FilmsTemplate from "./view/films.js";
import FilmTemplate from "./view/film.js";
import { generateFilms } from "./mock/film.js";
import ButtonShowMore from './view/button-show-more.js';
import FilmPopupTemplate from './view/film-popup.js';
import { render, RenderPosition } from "./utils.js";
import PopUpComments from "./view/comments.js";
import NoFilmView from "./view/no-film.js";

const SiteProfileComponent = new SiteProfile();
const SortTemplateComponent = new SortTemplate();
const FilmsTemplateComponent = new FilmsTemplate();
const ButtonShowMoreComponent = new ButtonShowMore();
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

render(siteHeaderElement, SiteProfileComponent.getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new NavigationTemplate(navigationChecked).getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, SortTemplateComponent.getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, FilmsTemplateComponent.getElement(), RenderPosition.BEFOREEND);

const fileListElement = siteMainElement.querySelector(`.films-list`);
const filmListContainerElement = fileListElement.querySelector(`.films-list__container`);


const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmTemplate(film);
  const filmPopupComponent = new FilmPopupTemplate(film);
  render(filmListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);

  const openPopup = () => {
    render(footerElement, filmPopupComponent.getElement(), RenderPosition.BEFOREEND);

    const CommentsContainer = filmPopupComponent.getElement().querySelector(".film-details__comments-list");

    film.comments.forEach(element => {
      const comments = new PopUpComments(element);
      render(CommentsContainer, comments.getElement(), RenderPosition.BEFOREEND);

    });
    document.addEventListener ('keydown', onEscKeyDown);
    filmPopupComponent.getElement().querySelector('.film-details__close-btn').addEventListener('click', ()=>{
      removePopup();
    })
  };

  function removePopup() {
    filmPopupComponent.getElement().remove();
  }
  filmComponent.getElement().addEventListener(`click`, () => {
    openPopup();
  });
  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      removePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };
};

const renderFilmList = ()=> {
  if (films.length===0) {
    render(filmListContainerElement, new NoFilmView().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  for (let i = 0; i < 5; ++i) {
    renderFilm(filmListContainerElement, films[i]);
  }

  const generateFiveElement = (lineCount) => {
    for (let i = lineCount; i < lineCount + 5; ++i) {
      renderFilm(filmListContainerElement, films[i]);
    }
    lineCount += 5;
    if (lineCount >= films.length) {
      buttonShow.remove();
    }
    return lineCount;
  };

  render(fileListElement, ButtonShowMoreComponent.getElement(), RenderPosition.BEFOREEND);

  //render(siteMainElement, new TopRatedTemplate().getElement(), RenderPosition.BEFOREEND);

  //render(siteMainElement, MostCommentedTemplateComponent.getElement(), RenderPosition.BEFOREEND);

  let renderCount = 5;

  const buttonShow = document.querySelector(`.films-list__show-more`);
  buttonShow.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    renderCount = generateFiveElement(renderCount);
  });
}
renderFilmList();
