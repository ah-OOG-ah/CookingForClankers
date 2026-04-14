// favorites.js: responsible for ensuring all favorite buttons are in the
// correct state and save to local storage

// ⚠️ NOTE: initFavorites() DEPENDS ON ALL FAVORITE-BTN ELEMENTS HAVING THE
// `data-recipe-id` ATTRIBUTE SET

const STORAGE_KEY = "favorites";
const ICON_CLASS = "bi";
const FILLED_HEART = "bi-heart-fill";
const UNFILLED_HEART = "bi-heart";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function setFavorites(favoritesList) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favoritesList));
}

function toggleFavorite(recipeId) {
  let favorites = getFavorites();
  const index = favorites.indexOf(recipeId);
  const adding = index === -1;
  if (adding) {
    favorites.push(recipeId);
  } else {
    favorites.splice(index, 1);
  }
  setFavorites(favorites);
  return adding;
}

function setHeartFill(element, filled = true) {
  const oldHeart = filled ? UNFILLED_HEART : FILLED_HEART;
  const newHeart = filled ? FILLED_HEART : UNFILLED_HEART;

  element.classList.add(ICON_CLASS);
  if (!element.classList.replace(oldHeart, newHeart)) {
    element.classList.add(newHeart);
  }
}

export function initFavorites() {
  let favorites = getFavorites();
  document.querySelectorAll(".favorite-btn").forEach((e) => {
    // ensure in correct state
    const id = parseInt(e.dataset.recipeId);
    if (!id) {
      console.warn("Favorite button without an ID!");
      return;
    }
    setHeartFill(e, favorites.includes(id));

    // add click listener to toggle state
    console.debug("adding onclick to heart");
    e.addEventListener("click", () => {
      setHeartFill(e, toggleFavorite(id));
    });
  });
}
