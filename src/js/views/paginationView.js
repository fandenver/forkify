import View from './View.js';

import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkupButton(curPage, btn) {
    return `
    <button data-goto="${btn === 'right' ? curPage + 1 : curPage - 1}" 
    class="btn--inline ${btn === 'right' ? 'pagination__btn--next' : 'pagination__btn--prev'}">
      <span>Page ${btn === 'right' ? curPage + 1 : curPage - 1}</span>
      <svg class="search__icon">
        <use href="${icons}#${btn === 'right' ? 'icon-arrow-right' : 'icon-arrow-left'}"></use>
      </svg>
    </button>
    `;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage,
    );

    if (this._data.page === 1 && numPages > 1) {
      return this._generateMarkupButton(curPage, 'right');
    }

    if (this._data.page === numPages && numPages > 1) {
      return this._generateMarkupButton(curPage, 'left');
    }

    if (this._data.page < numPages) {
      return (
        this._generateMarkupButton(curPage, 'left') +
        this._generateMarkupButton(curPage, 'right')
      );
    }

    return '';
  }
}

export default new PaginationView();
