import AbstractComponent from './abstract-component.js';

export default class MovieContainer extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<section class="films">
    </section>`;
  }
}
