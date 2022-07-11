import View from './view';

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');
  _getMarkup() {}

  addHandlerAddRecipe(handler) {
    // Showing and Hiding Modal
    const btnAddRecipe = document.querySelector('.nav__btn--add-recipe');
    const btnCloseModal = document.querySelector('.btn--close-modal');
    [btnAddRecipe, this._overlay, btnCloseModal].forEach(ele => {
      ele.addEventListener('click', this.toggleWindow.bind(this));
    });

    //Upload Button
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      const dataArr = [...new FormData(this._parentElement)]; // ENTRIES
      const data = Object.fromEntries(dataArr); // OBJECT
      //console.log(data);
      handler(data);
    });
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden'); //
  }
}

export default new addRecipeView();
