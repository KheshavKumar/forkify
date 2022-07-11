import { API_URL, KEY, RES_PER_PAGE } from './config';
import { getJSON, sendJSON } from './helpers';
export const state = {
  recipe: {},
  results: [],
  resultsPerPage: RES_PER_PAGE,
  page: 1,
  bookmarks: [],
};

function createRecipeObject(data) {
  const receivedRecipe = data.data.recipe;
  return {
    cookingTime: receivedRecipe.cooking_time,
    id: receivedRecipe.id,
    imageUrl: receivedRecipe.image_url,
    ingredients: receivedRecipe.ingredients,
    publisher: receivedRecipe.publisher,
    servings: receivedRecipe.servings,
    sourceUrl: receivedRecipe.source_url,
    title: receivedRecipe.title,
    ...(receivedRecipe.key && { key: receivedRecipe.key }),
  };
}
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(API_URL + `${id}`);
    //const data = await res.json();
    //console.log(data);
    // if (!res.ok) throw new Error(data.message);
    //const receivedRecipe = data.data.recipe;
    state.recipe = createRecipeObject(data);

    state.recipe.bookmarked = state.bookmarks.some(rec => rec.id == id);
  } catch (err) {
    // /console.error(err);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = await getJSON(`${API_URL}/?search=${query}&key=${KEY}`);
    //console.log(data);
    state.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        imageUrl: rec.image_url,
        publisher: rec.publisher,
        title: rec.title,
        ...(rec.key && { key: rec.key }),
      };
    });
    //console.log(state.results);
    //state.results = results.map(re);
  } catch (err) {
    throw err;
  }
};

export function getSearchResultsPage(page = state.page) {
  state.page = page;
  const start = (page - 1) * state.resultsPerPage;
  const end = page * state.resultsPerPage;
  //console.log(state.results.slice(start, end));
  return state.results.slice(start, end);
}

export function updateServings(newServings) {
  if (newServings < 1) return;
  console.log(newServings);
  console.log(state);
  //initalServings:inital::newServings:final
  //final = initalQuantitiy*newServings/initialServings
  state.recipe.ingredients.forEach(ing => {
    //console.log(ing.quantity, newServings);
    ing.quantity =
      (Number(ing.quantity) * newServings) / Number(state.recipe.servings);
  });
  state.recipe.servings = newServings;
}

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

function initalizeBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //console.log(bookmarks);
  if (bookmarks) {
    state.bookmarks = bookmarks;
  }
}

export function addBookmark(recipe) {
  !state.bookmarks.includes(recipe) ? state.bookmarks.push(recipe) : 0;
  if (state.recipe.id === recipe.id) state.recipe.bookmarked = true;
  console.log(state.bookmarks);
  persistBookmarks();
}

export function deleteBookmark(id) {
  const i = state.bookmarks.findIndex(ele => ele.id === id);
  state.bookmarks.splice(i, 1);
  state.recipe.bookmarked = false;
  persistBookmarks();
}

export async function uploadRecipe(newRecipe) {
  //console.log(state.recipe);
  //console.log(newRecipe);
  const ingredients = Object.entries(newRecipe)
    .filter(entry => entry[0].includes('ingredient') && entry[1].trim() !== '')
    .map(entry => entry[1].split(','))
    .map(tri => {
      if (tri.length !== 3) throw new Error('Please use the correct format');
      return { quantity: tri[0], unit: tri[1], description: tri[2] };
    });

  //console.log(ingredients);

  let { cookingTime, image, publisher, servings, sourceUrl, title } = newRecipe;
  const recipe = {
    cooking_time: +cookingTime,
    image_url: image,
    ingredients,
    publisher,
    servings: +servings,
    source_url: sourceUrl,
    title,
  };
  //console.log(recipe);
  data = await sendJSON(`${API_URL}?key=${KEY}`, recipe);

  state.recipe = createRecipeObject(data);
  addBookmark(state.recipe);
  console.log(state.recipe);
}

export function init() {
  initalizeBookmarks();
}

init();
