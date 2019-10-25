import AbstractComponent from './abstract-component.js';

export default class Stats extends AbstractComponent {

  getTemplate() {
    return `<a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>`;
  }
}
