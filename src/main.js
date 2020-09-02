import SiteProfile from "./view/avatar.js";
import NavigationTemplate from "./view/search.js";
import {generateFilms} from "./mock/film.js";
import {render, RenderPosition} from "./utils/render.js";
import MovieList from "../src/presenter/movie-list.js";

const SiteProfileComponent = new SiteProfile();
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

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

render(siteHeaderElement, SiteProfileComponent, RenderPosition.BEFOREEND);

render(siteMainElement, new NavigationTemplate(navigationChecked), RenderPosition.BEFOREEND);
const filmPresenter = new MovieList(siteMainElement);
filmPresenter.init(films);
