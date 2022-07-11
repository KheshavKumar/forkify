import View from './view';
import icons from 'url:../../img/icons.svg';
class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it :)`;
  _message = '';
  _getMarkup() {
    let html = '';
    const currId = window.location.hash.slice(1);
    this._data.bookmarks.forEach(
      res =>
        (html += `<li class="preview">
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
      </li>`)
    );

    return html;
  }
}

export default new BookmarksView();
