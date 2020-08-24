export default class renderFilmListClass {
  constructor(filmListElement, film) {
    const filmComponent = new FilmTemplate(film);
    const filmPopupComponent = new FilmPopupTemplate(film);
  }

  _renderFilmList() {
const renderFilmList = ()=> {
  if (films.length===0) {
    render(filmListContainerElement, new NoFilmView(), RenderPosition.BEFOREEND);
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

  render(fileListElement, ButtonShowMoreComponent, RenderPosition.BEFOREEND);

  let renderCount = 5;

  const buttonShow = document.querySelector(`.films-list__show-more`);

  buttonShow.setEditClickHandler(() => {
     evt.preventDefault();
    renderCount = generateFiveElement(renderCount);
  });
};
  }
}
