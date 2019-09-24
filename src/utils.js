export const getRandomInteger = (max, min = 1) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

export const getRandomElements = (arr, count, func) => Array.apply(null, {length: count}).map(() => arr[func(0, arr.length - 1)]);

export const getRandomTime = () => {
  let munute = getRandomInteger(180, 65);
  return `${Math.floor(munute / 60)} h ${Math.floor(munute % 60)} m`;
};

export const descriptionFilm = (description) => getRandomElements(description.split(`. `), getRandomInteger(3, 1), getRandomInteger).join(`. `);

export function getComments(data, id) {
  const commetns = [];

  data.forEach((item) => {
    if (item.idFilm === id) {
      commetns.push(item);
    }
  });
  return commetns;
}

export function getRandomDate() {
  let randomYear = getRandomInteger(1930, 1990);
  let randomMonth = getRandomInteger(1, 12);
  let randomDate = getRandomInteger(1, 30);
  return new Date(randomYear, randomMonth, randomDate);
}

export const getCountWatchlist = (item) =>item.watchlist ? true : false;
export const getCountFavorite = (item) => item.favorite ? true : false;
export const getCountwatched = (item) => item.watched ? true : false;

export const counterFilters = (array, func) => {
  return array.reduce((total, x) => (func(x) ? total + 1 : total), 0);
};

export const generateCommetnts = (length, comment, comments) => {

  for (let i = 0; i < length; i++) {
    let filmComments = new Array(getRandomInteger(4)).fill(``).map(comment);
    filmComments.forEach((item) => {
      item.idFilm = i;
      comments.push(item);
    });
  }

  for (let i = 0; i < comments.length; i++) {
    comments[i].id = i;
  }
};

export function renderElement(container, template, type = `beforeend`) {
  container.insertAdjacentHTML(type, template);
}
