import View from './view';

class SearchView extends View {
  _parentElement;
  _btnSearch;
  constructor() {
    super();
    this._parentElement = document.querySelector('.search');
    this._btnSearch = document.querySelector('.search__btn');
  }

  _clear() {
    this._parentElement.querySelector('.search__field').value = '';
  }
  getQuery() {
    return this._parentElement.querySelector('.search__field').value;
  }

  addHandlerSearch(func) {
    this._btnSearch.addEventListener('click', e => {
      e.preventDefault();

      func();

      this._clear();
    });
  }
}

export default new SearchView();
