export const emojis = [`smile`, `sleeping`, `puke`, `angry`];

export const getRandomInteger = (max, min = 1) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

export const getRandomElements = (arr, count, func) => new Array(count).fill(``).map(() => arr[func(0, arr.length - 1)]);

export const getRandomTime = () => {
  let munute = getRandomInteger(180, 65);
  return `${Math.floor(munute / 60)} h ${Math.floor(munute % 60)} m`;
};

export const descriptionFilm = (description) => {
  const descriptionArray = getRandomElements(description.split(`. `), getRandomInteger(3, 1), getRandomInteger);
  return `${descriptionArray.join(`.`)}.`;
};

export function getComments(data, id) {
  const commetnsData = data.reduce((commetns, i) => {
    if (i.idFilm === id) {
      commetns.push(i);
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

export const counterFilters = (array, data) => {
  return array.reduce((total, i) => (i[data] ? total + 1 : total), 0);
};

export const generateCommetnts = (length, comment, comments) => {
  let id = 0;
  for (let a = 0; a < length; a++) {
    let filmComments = new Array(getRandomInteger(4)).fill(``).map(comment);
    filmComments.forEach((i) => {
      i.id = id++;
      i.idFilm = a;
      comments.push(i);
    });
  }

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

export const render = (container, element, place = `beforeend`) => {
  const places = {
    'Position.BEFORE': container.before(element),
    'Position.AFTERBEGIN': container.prepend(element),
    'Position.BEFOREEND': container.append(element),
  };
  return places[place];
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};
