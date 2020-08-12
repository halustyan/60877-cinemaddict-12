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
    emotions: generateEmotions(),
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
  return {
    description: generateDescriptionFilm(),
    posters: generatePosters(),
    deskriptionsOfTheText: generateDescriptions(),
    comments: generateСomments(),
    rate: generateRates(),
    yearOfTheProduction: generateYears(),
    howFilmlasts: generateFilmLasts(),
    genres: generateGenres(),
    watchlist: trueOrFalse(),
    favorites: trueOrFalse(),
    watched: trueOrFalse(),
    director: generateDirector(),
    writers: generateWriters(),
    actors: generateActors(),
    country: generateCountry(),
    emotion: generateEmotions(),
    author: generateAuthors(),
    date: generateDates(),
  }
};
