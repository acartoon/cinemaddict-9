import {movie, filters, comments} from './data.js';
import PageController from './controllers/page-controller.js';

const bodyContainer = document.body;

const pageController = new PageController(bodyContainer, movie, comments, filters);
pageController.init();

const footerStatistics = document.querySelector(`.footer__statistics p`);
footerStatistics.innerHTML = `${movie.length} movies inside`;
