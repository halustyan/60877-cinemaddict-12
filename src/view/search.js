import {createElement} from "../utils.js";
const createNavigationTemplate = (navigationChecked) => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" id="hrefWatchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${navigationChecked.watchlist}</span></a>
        <a href="#history" id="hrefHistory"class="main-navigation__item">History <span class="main-navigation__item-count">${navigationChecked.history}</span></a>
        <a href="#favorites" id="hrefFavorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${navigationChecked.favorites}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class NavigationTemplate {
  constructor(navigationChecked) {
    this._navigation = navigationChecked;
    this._element = null;
  }

  getTemplate() {
    return createNavigationTemplate(this._navigation);
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
