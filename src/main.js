import SiteProfile from "./view/avatar.js";
import {generateFilms} from "./mock/film.js";
import {render, RenderPosition, remove} from "./utils/render.js";
import MoviesModel from "./model/movies.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import MovieListPresenter from "./presenter/movie-list.js";
import {MenuItem} from "./const.js";
import Statistic from "./view/statistic.js";

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
const filmsModel = new MoviesModel();
filmsModel.setFilms(films);
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
filterPresenter.init();

const movieList = new MovieListPresenter(siteMainElement, filmsModel, filterModel);
movieList.init(films);

let statistic = null;

const handleSetMenuClick = (evt) => {
  evt.preventDefault();
  const menuItem = evt.target.dataset.type;
  switch (menuItem) {
    case MenuItem.FILMS:
      if (statistic !== null) {
        movieList.init();
        remove(statistic);
        statistic = null;
      }
      break;
    case MenuItem.STATISTICS:
      statistic = new Statistic(filmsModel.getFilms());
      movieList.destroy();

      render(siteMainElement, statistic, RenderPosition.BEFOREEND);
      statistic.renderStatistic();
      break;
  }


};

siteMainElement.addEventListener(`click`, handleSetMenuClick);
