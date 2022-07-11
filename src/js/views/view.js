import icons from 'url:../../img/icons.svg';
export default class View {
  _data;
  /**
   *
   * Superclass
   * @param {Object | Object[]} data data to be rendered
   */
  render(data) {
    this._data = data;
    this._clear();
    const markup = this._getMarkup();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    if (!data || (Array.isArray(data) && data.length == 0))
      return this.renderError('Sorry! No results found 😢 ');

    //console.log(data);
    const html = this._getMarkup(data.recipe);
    const newDOM = document.createRange().createContextualFragment(html);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEle, i) => {
      let currEle = currElements[i];
      //Change TEXT
      // console.log(currEle.children);
      if (
        !newEle.isEqualNode(currEle) &&
        newEle?.firstChild?.nodeValue.trim() !== ''
      ) {
        //console.log([newEle, newEle.firstChild]);
        currEle.textContent = newEle.textContent;
      }

      //CHange Attributes
      if (!newEle.isEqualNode(currEle)) {
        Array.from(newEle?.attributes).forEach(attr => {
          currEle?.setAttribute(attr.name, attr.value);
        });
      }
    });
    //console.log(newElements);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    this._parentElement.innerHTML = '';
    const html = `<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  renderError(message = this._errorMessage) {
    this._parentElement.innerHTML = '';
    const html = `<div class="error">
      <div>
        <svg>
          <use href="${icons}.svg#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;

    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  renderMessage() {
    this._parentElement.innerHTML = '';
    const html = `<div class="error">
      <div>
        <svg>
          <use href="${icons}.svg#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;

    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }
}
