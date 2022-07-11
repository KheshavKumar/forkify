import icons from 'url:../img/icons.svg';
import addRecipeView from './views/addRecipeView.js';
import bookmarksView from './views/bookmarksView.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView';
import paginationView from './views/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
let id = window.location.hash.slice(1);
//Happens whenever a change in hash of url or loading
const controlRecipe = async function () {
  try {
    let id = window.location.hash.slice(1);
    resultsView.render(model.getSearchResultsPage());

    //getting ID in url

    if (!id) return;
    //loading spinner while fetching
    recipeView.renderSpinner(recipeContainer);
    //fetching data and storing it
    await model.loadRecipe(id);
    //rendering the recipe view
    recipeView.render(model.state);
    bookmarksView.render(model.state);
    //rednerign results viee
    //recipeView.update(model.state);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
    //alert(err);
  }
};
const controlSearchResults = async function () {
  //Get Search Query
  const query = searchView.getQuery();
  if (!query) return;

  // Load Search results
  resultsView.renderSpinner();
  await model.loadSearchResults(query);
  const results = model.state.results;
  //console.log(results);
  resultsView.render(model.getSearchResultsPage(1));
  paginationView.render(model.state);
};

const controlPagination = async function (goto) {
  resultsView.render(model.getSearchResultsPage(goto));
  paginationView.render(model.state);
};

const controlServings = function (newServings) {
  //calculate updated recipe
  model.updateServings(newServings);
  //display
  //recipeView.render(model.state);
  recipeView.update(model.state);
};

const controlAddBookmark = function () {
  if (model.state.recipe.bookmarked) {
    model.deleteBookmark(model.state.recipe.id);
  } else {
    model.addBookmark(model.state.recipe);
  }

  bookmarksView.render(model.state);
  recipeView.update(model.state);
};
//controlSearchResults();

async function controlAddRecipe(recipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(recipe);
    recipeView.render(model.state);
    bookmarksView.render(model.state);
    window.history.pushState(null, '', `#${model.state.id}`);
    addRecipeView.toggleWindow();
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
}

function newFeature() {
  console.log('Welcome!');
}

function init() {
  model.init();
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  recipeView.addHandlerChangeServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  addRecipeView.addHandlerAddRecipe(controlAddRecipe);
  paginationView.addHandlerPagination(controlPagination);
  newFeature();
}
init();

////// EXTRA CODE

// Get Recipe for fetch
// fetch(
//   'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
// )
//   .then(res => {
//     return res.json();
//   })
//   .then(data => {
//     if (data.status === 'fail') throw new Error(data.message);
//     return console.log(data);
//   })
//   .catch(err => alert(err));
