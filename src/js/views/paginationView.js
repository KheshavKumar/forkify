import icons from 'url:../../img/icons.svg';
import View from './view';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      //console.log(btn.dataset.goto);
      handler(Number(btn.dataset.goto));
    });
  }
  _getMarkup() {
    //needs prev pag
    let html = '';
    let page = this._data.page;
    //console.log(page * this._data.resultsPerPage, this._data.results.length);
    let hasNextPage =
      page * this._data.resultsPerPage < this._data.results.length;
    //console.log(hasNextPage);
    if (page > 1) {
      html += `<button class="btn--inline pagination__btn--prev" data-goto = "${
        page - 1
      }">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${page - 1}</span>
      </button>`;
    }
    if (hasNextPage) {
      html += `<button class="btn--inline pagination__btn--next" data-goto = "${
        page + 1
      }">
        <span>Page ${page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }
    return html;
  }
}

export default new PaginationView();
