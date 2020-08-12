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
    `Джон Уик`,
    `Лысый нянь`,
    `Беверли хилс`,
    `Сваты`,
    `Близнецы`,
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const emotions = [`angry.png`, `puke.png`, `sleeping.png`, `smile.png`];
const descriptionsOfTheText = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget`,
  `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.
  Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.`
];
const generateDescriptions = () => {

  const randomIndex = getRandomInteger(0, descriptionsOfTheText.length - 1);

  return descriptionsOfTheText[randomIndex];
};

const posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const generatePoster = () => {
  return `./images/posters/${posters[getRandomInteger(0, posters.length - 1)]}`;
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

const generateDates = () => {
  const yearComments = getRandomInteger(1960, 2020);
  const month = getRandomInteger(0, 11);
  const day = getRandomInteger(0, 30);
  return new Date(yearComments, month, day).toString();
};

const generateAuthors = () => {
  const authors = ['Grisha', 'Max', 'Alex', 'Yulya', 'Olha'];

  const randomIndex = getRandomInteger(0, authors.length - 1);

  return authors[randomIndex];
};

const generateText = () => {
  return descriptionsOfTheText[getRandomInteger(0, descriptionsOfTheText.length - 1)];
};

const generateEmotion = () => {
  return `./images/emoji/${emotions[getRandomInteger(0, emotions.length - 1)]}`;
}; // получаем индекс эмоции

const generateComment = () => {
  return {
    text: generateText(),
    emotion: generateEmotion(),
    author: generateAuthors(),
    date: generateDates(),
  };
};

const generateCommentMessages = () => {
  const result = [];
  const count = getRandomInteger(0, 100);
  for (let i = 0; i < count; ++i) {
    result.push(generateComment());
  }
  return result;
};

let trueOrFalse = () => {
  let ch = !!getRandomInteger(0, 1);
  let ch1 = ``;
  if (ch === true) {
    ch1 = `checked`;
  } else {
    ch1 = ``;
  }
  return ch1;
};

const generateСomments = () => {
  let commentsInFilm = [];
  let elem = [{
    emotions: generateEmotion(),
    date: generateDates(),
    author: generateAuthors(),
    message: generateCommentMessages(),
  }
];

const randomIndex = getRandomInteger(1, 10);
  for (let i=0; i<randomIndex; i++) {
    commentsInFilm.push(elem);
  }
  return commentsInFilm;
};

const writers = [
  `Роман Кантор`,
  `Рената Литвинова‎`,
  `Алексей Баталов`,
  `Андрей Тарковский`,
  `Эльдар Рязанов`,
  `Михаил Зощенко`,
  `Эмиль Брагинский`,
  `Юрий Нагибин`,
  `Григорий Чухрай`,
  `Дмитрий Марьянов`,
];

const generateWriters = () => {
  return writers[getRandomInteger(0, writers.length - 1)];
};

const generateYear = () => {
  return year[getRandomInteger(0, year.length - 1)];
};

const year = [
  `1960`,
  `1970`,
  `1980`,
  `1990`,
  `2000`,
  `2010`,
  `2020`,
  `2012`,
  `2015`,
  `2017`,
];

const actors = [
  `Данила Козловский`,
  `Александр Петров`,
  `Владимир Машков`,
  `Дмитрий Нагиев`,
  `Константин Хабенский`,
  `Евгений Миронов`,
  `Федор Бондарчук`,
  `Павел Прилучный`,
  `Владимир Вдовиченко`,
  `Владимир Вдовиченко`,
];

const generateActors = () => {
  return actors[getRandomInteger(0, actors.length - 1)];
};

const countrys = [
  `Россия`,
  `США`,
  `Италия`,
  `Германия`,
  `Франция`,
  `Австралия`,
];

const generateCountry = () => {
  return countrys[getRandomInteger(0, countrys.length - 1)];
};

export const generateFilms = () => {
  const films = [];
  for (let i = 0; i < 40; ++i) {
    films.push(generateFilm());
  }
  return films;
};

const generateDescription = () => {
  const numberSentence = getRandomInteger(1, 5); // получаем количество  предложений
  const result = [];
  for (let i = 0; i < numberSentence; ++i) {
    result.push(descriptionsOfTheText[getRandomInteger(0, descriptionsOfTheText.length - 1)]); // добавляем в result по одному
  }
  return result.join(` `);
}; // получаем описание

const titles = [
  `Бриллиантовая рука`,
  `Кавказская пленница`,
  `12 стульев`,
  `Мебиус`,
  `Карнавальная ночь`,
  `любовь и голуби`,
  `Стажер`,
  `Лысый нянь`,
  `Беверли хилс`,
  `Сваты`,
  `Близнецы`,
];

const generateTitle = () => {
  return titles[getRandomInteger(0, titles.length - 1)];
};

const generateDuration = () => {
  return duration[getRandomInteger(0, duration.length - 1)];
};

const duration = [
  `60 минут`,
  `90 минут`,
  `120 минут`,
  `75 минут`,
  `110 минут`,
  `85 минут`,
  `65 минут`,
  `105 минут`,
  `95 минут`,
  `70 минут`,
];

const generateGenre = () => {
  return genre[getRandomInteger(0, genre.length - 1)];
};

const genre = [`драма`, `комедия`, `боевик`, `мелодрама`, `триллер`];

const generateRating = () => {
  return rating[getRandomInteger(0, rating.length - 1)];
};

const rating = [
  `9.8`,
  `5.6`,
  `3.5`,
  `7.9`,
  `8.7`,
  `4.0`,
  `5.6`,
  `7.2`,
  `6.8`,
  `4.8`,
];

const directors = [
  `Тимур Бекмамбетов`,
  `Леван Габриадзе`,
  `Фёдор Бондарчук`,
  `Николай Лебедев`,
  `Дмитрий Дьяченко`,
  `Жора Крыжовников`,
  `Марюс Вайсберг`,
  `Сарик Андреасян`,
  `Андрей Кравчук`,
  `Кирилл Кузин`,
];

const generateDirector = () => {
  return directors[getRandomInteger(0, directors.length - 1)];
};

const generateComments = () => {
  const result = [];
  const count = getRandomInteger(0, 100);
  for (let i = 0; i < count; ++i) {
    result.push(generateComment());
  }
  return result;
};

export const generateFilm = () => {
  return {
    description: generateDescription(),
    poster: generatePoster(),
    deskriptionsOfTheText: generateDescriptions(),
    title: generateTitle(),
    comments: generateComments(),
    rating: generateRating(),
    yearOfTheProduction: generateYears(),
    howFilmlasts: generateFilmLasts(),
    genres: generateGenres(),
    watchlist: trueOrFalse(),
    favorites: trueOrFalse(),
    director: generateDirector(),
    watched: trueOrFalse(),
    director: generateDirector(),
    writers: generateWriters(),
    actors: generateActors(),
    country: generateCountry(),
    emotion: generateEmotion(),
    author: generateAuthors(),
    year: generateYear(),
    date: generateDates(),
    release: generateYear(),
    duration: generateDuration(),
    genre: generateGenre(),
  }
};
