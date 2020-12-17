import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = Number(btn.dataset.goto);
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupButton(currentPage, 'next');
    }
    // Last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupButton(currentPage, 'prev');
    }
    // Other page
    if (currentPage < numPages) {
      return (
        this._generateMarkupButton(currentPage, 'prev') +
        this._generateMarkupButton(currentPage, 'next')
      );
    }
    // Page 1, and there are no other pages
    return '';
  }
  _generateMarkupButton(curPage, whichBtn) {
    if (whichBtn === 'prev')
      return `<button data-goto="${
        curPage - 1
      }"class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>`;
    if (whichBtn === 'next')
      return `<button data-goto="${
        curPage + 1
      }"class="btn--inline pagination__btn--next">
    <span>Page ${curPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;
  }
}

export default new PaginationView();
