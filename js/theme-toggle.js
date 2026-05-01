const THEME_STORAGE_KEY = "theme";

const getCurrentTheme = () => localStorage.getItem(THEME_STORAGE_KEY) || "dark";
const setTheme = (theme) => {
  document.querySelector("html").dataset.bsTheme = theme;
  const newIcon = theme === "dark" ? "bi-sun-fill" : "bi-moon-stars-fill";
  document.getElementById("theme-icon").className = `bi ${newIcon}`;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};

setTheme(getCurrentTheme());
document.getElementById("theme-toggle").addEventListener("click", (event) => {
  const newTheme = getCurrentTheme() === "dark" ? "light" : "dark";
  setTheme(newTheme);
});
