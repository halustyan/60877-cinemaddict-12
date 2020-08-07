import {createMenuIcon} from './view/menu.js';
import {createmainNavigationIndexHtml} from './view/navigation.js';
import {createButtonShowMore} from './view/buttonShowMore.js';
import {renderFilmCard} from './view/filmCard.js';
import {renderFilmPopUp} from './view/filmDetails.js';

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

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateDescriptionFilm = () => {
  const descriptions = [
    `The Great Flamarion`,
    `Пятый элемент`,
    `Джон Уик`
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generateDescriptions = () => {
  const descriptionsOfTheText = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget`,
    `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
    Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.`
  ];

  const randomIndex = getRandomInteger(0, descriptionsOfTheText.length - 1);

  return descriptionsOfTheText[randomIndex];
};

const generatePosters = () => {
  const posters = ['made-for-each-other.png', 'popeye-meets-sinbad.png', 'sagebrush-trail.png', 'santa-claus-conquers-the-martians.png', 'the-dance-of-life.png', 'the-great-flamarion.png', 'the-man-with-the-golden-arm.png'];

  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};

const generateYears = () => {
  const years = ['1980', '1990', '2000', '2010', '2020'];

  const randomIndex = getRandomInteger(0, years.length - 1);

  return years[randomIndex];
};

const generateFilmLasts = () => {
  const filmlasts = ['1h 45m', '2h 55m', '1h 30m', '2h 00m', '0h 40m'];

  const randomIndex = getRandomInteger(0, filmlasts.length - 1);

  return filmlasts[randomIndex];
};

const generateGenres = () => {
  const filmlasts = ['action', 'sci-fi', 'horror', 'love', 'pop'];

  const randomIndex = getRandomInteger(0, generateGenres.length - 1);

  return generateGenres[randomIndex];
};

const generateEmotions = () => {
  const emotions = ["smile", "sleeping", "puke", "angry"];

  const randomIndex = getRandomInteger(0, emotions.length - 1);

  return emotions[randomIndex];
};

const generateDates = () => {
  const differentDates = ['2019/12/31 23:59', '2029/12/31 23:59', '2039/12/31 23:59', '2049/12/31 23:59', '2059/12/31 23:59'];

  const randomIndex = getRandomInteger(0, differentDates.length - 1);

  return differentDates[randomIndex];
};

const generateAuthors = () => {
  const authors = ['Grisha', 'Max', 'Alex', 'Yulya', 'Olha'];

  const randomIndex = getRandomInteger(0, authors.length - 1);

  return authors[randomIndex];
};

const generateCommentMessages = () => {
  const messageComment = ["I love this film", "I did not like this film", "I am the first", "I am the second", "Russia has Baikal"];

  const randomIndex = getRandomInteger(0, messageComment.length - 1);

  return messageComment[randomIndex];
};


const generateRates = () => {
  const rate = [1,2,3,4,5];

  const randomIndex = getRandomInteger(0, rate.length - 1);

  return rate[randomIndex];
};

export const generateFilm = () => {
  return {
    description: generateDescriptionFilm(),
    posters: generatePosters(),
    deskriptionsOfTheText: generateDescriptions(),
    comments: {
      emotions: generateEmotions(),
      date: generateDates(),
      author: generateAuthors(),
      message: generateCommentMessages(),
    },
    rate: generateRates(),
    yearOfTheProduction: generateYears(),
    howFilmlasts: generateFilmLasts(),
    genres: generateGenres(),
  }
};
