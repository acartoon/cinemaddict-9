export const emojis = [`smile`, `sleeping`, `puke`, `angry`];

export const namesPeople = new Set([
  `Alfred Hitchcock`,
  `Stanley Kubrick`,
  `Steven Spielberg`,
  `Андрей Тарковский`,
  `Quentin Tarantino`,
  `Sigourney Weaver`,
  `John Hurt`,
  `Ian Holm`,
]);

export const getRandomInteger = (max, min = 1) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

export const getRandomElements = (arr, count, func) => new Array(count).fill(``).map(() => arr[func(0, arr.length - 1)]);

export function getRandomString(length) {
  const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;
  let result = ``;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export const getRandomTime = () => {
  let munute = getRandomInteger(180, 65);
  return `${Math.floor(munute / 60)} h ${Math.floor(munute % 60)} m`;
};

export const getDescriptionFilm = (description) => {
  const descriptionArray = getRandomElements(description.split(`. `), getRandomInteger(3, 1), getRandomInteger);
  return `${descriptionArray.join(`.`)}.`;
};

export function getComments(movieData, id) {
  const commetnsData = movieData.reduce((commetns, comment) => {
    if (comment.idFilm === id) {
      commetns.push(comment);
    }
    return commetns;
  }, []);
  return commetnsData;
}

export function getRandomDate() {
  let randomYear = getRandomInteger(1930, 1990);
  let randomMonth = getRandomInteger(1, 12);
  let randomDate = getRandomInteger(1, 30);
  return new Date(randomYear, randomMonth, randomDate);
}

export const getCountFilms = (movieData, key) => {
  return movieData.reduce((total, movie) => (movie[key] ? total + 1 : total), 0);
};

export const generateComments = (movieData, getComment) => {
  return movieData.reduce((AllComments, movie) => {
    let movieComments = new Array(getRandomInteger(4)).fill(``).map(getComment);
    movieComments.forEach((comment) => {
      comment.idFilm = movie.id;
      AllComments.push(comment);
    });
    return AllComments;
  }, []);
};

export function renderElement(container, template, type = `beforeend`) {
  container.insertAdjacentHTML(type, template);
}

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.lastChild;
};

export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export const render = (container, element, place) => {
  const places = {
    'afterbegin': container.prepend(element),
    'beforeend': container.append(element),
  };
  return places[place];
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};
