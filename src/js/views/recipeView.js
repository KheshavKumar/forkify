import icons from 'url:../../img/icons.svg';
//import { Fraction } from 'fracty';
let Fraction = require('fracty');
import View from './view.js';
class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'This recipe does not exist, try chosing another one!';
  _successMessage = '';

  _getMarkup() {
    let recipe = this._data.recipe;
    let html = `
  <figure class="recipe__fig">
    <img src="${recipe.imageUrl}" alt="Food Image" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${recipe.title}</span>
    </h1>
  </figure>
  
  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        recipe.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        recipe.servings
      }</span>
      <span class="recipe__info-text">servings</span>
  
      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings" data-new="${
          Number(recipe.servings) - 1
        }">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings" data-new="${
          Number(recipe.servings) + 1
        }">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>
  
    <div class="recipe__user-generated ${!recipe.key ? 'hidden' : ''}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
    <button class="btn--round btn--bookmark">
      <svg class="">
        <use href="${icons}#icon-bookmark${
      this._data.recipe.bookmarked ? '-fill' : ''
    }"></use>
      </svg>
    </button>
  </div>
  
  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
      ${function () {
        let ingsHtml = '';
        this._data.recipe.ingredients.forEach(ing => {
          ingsHtml += `<li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${
            ing.quantity ? Fraction(ing.quantity) : ''
          }</div>
          <div class="recipe__description">
            <span class="recipe__unit">${ing.unit}</span>
            ${ing.description}
          </div>
        </li>`;
        });
        return ingsHtml;
      }.bind(this)()}
      
    </ul>
  </div>
  
  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        recipe.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${recipe.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
    return html;
  }

  addHandlerChangeServings(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--tiny');
      //console.log(btn);
      if (!btn) return;
      //console.log(btn.dataset.new);
      handler(Number(btn.dataset.new));
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--bookmark');
      if (btn) {
        handler();
      }
    });
  }
  addHandlerRender(handler) {
    window.addEventListener('hashchange', handler);
    window.addEventListener('load', handler);
  }
}

export default new RecipeView();
