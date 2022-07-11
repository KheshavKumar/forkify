import esArrayIterator from 'core-js/modules/es.array.iterator';
import icons from 'url:../../img/icons.svg';
import View from './view';
class ResultsView extends View {
  //_results;
  _parentElement = document.querySelector('.results');
  // render(results) {
  //   this._results = results;
  //   if (!results || (Array.isArray(results) && results.length == 0))
  //     return this.renderError('Sorry! No results found 😢 ');
  //   this._populateResults();
  // }
  _getMarkup() {
    const currId = window.location.hash.slice(1);
    this._parentElement.innerHTML = '';
    const html = this._data
      .map(
        res =>
          `<li class="preview">
    <a class="preview__link ${
      currId === res.id ? `preview__link--active` : ''
    } " href="#${res.id}">
      <figure class="preview__fig">
        <img src="${res.imageUrl}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${res.title}</h4>
        <p class="preview__publisher">${res.publisher}</p>
        <div class="preview__user-generated ${res.key ? '' : 'hidden'}">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
      </div>
    </a>
  </li>`
      )
      .join('');

    //this._parentElement.insertAdjacentHTML('afterbegin', html);
    return html;
  }
}

export default new ResultsView();
