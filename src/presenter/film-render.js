import SiteProfile from "./view/avatar.js";
import NavigationTemplate from "./view/search.js";
import SortTemplate from "./view/sort-films.js";
import FilmsTemplate from "./view/films.js";
import ButtonShowMore from './view/button-show-more.js';
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const fileListElement = siteMainElement.querySelector(`.films-list`);

export default class FilmRender {
  constructor() {
this._SiteProfileComponent = new SiteProfile();
this._SortTemplateComponent = new SortTemplate();
this._FilmsTemplateComponent = new FilmsTemplate();
this._ButtonShowMoreComponent = new ButtonShowMore();
this._NavigationTemplate = new NavigationTemplate();
  }
  _renderSiteProfile() {
    render(siteHeaderElement, this._SiteProfileComponent, RenderPosition.BEFOREEND);
  }
  _renderNavigation() {
    render(siteMainElement, this._NavigationTemplate(navigationChecked), RenderPosition.BEFOREEND);
  }
  _renderSort() {
    render(siteMainElement, this._SortTemplateComponent, RenderPosition.BEFOREEND);
  }
  _renderFilmsTemplate() {
    render(siteMainElement, this._FilmsTemplateComponent, RenderPosition.BEFOREEND);
  }
  _renderButtonShowMore() {
    render(fileListElement, this._ButtonShowMoreComponent, RenderPosition.BEFOREEND);
  }
}
