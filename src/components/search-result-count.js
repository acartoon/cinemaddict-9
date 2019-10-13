import AbstractComponent from './abstract-component.js';

export default class SearchResultCount extends AbstractComponent {
  constructor(countResult) {
    super();
    this._countResult = countResult;
  }
  getTemplate() {
    return `<div class="result">
    <p class="result__text">Result <span class="result__count">${this._countResult}</span></p>
  </div>`;
  }
}
