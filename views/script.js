const themeButton = document.querySelector("#theme-toggle");

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;

  themeButton.textContent =
    theme === "dark"
      ? "☀"
      : "☾";
}

let savedTheme = "dark";

try {
  savedTheme = localStorage.getItem("theme") || "dark";
} catch {
  // Use the default theme when browser storage is unavailable.
}

applyTheme(savedTheme === "light" ? "light" : "dark");

themeButton.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme;
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  applyTheme(nextTheme);

  try {
    localStorage.setItem("theme", nextTheme);
  } catch {
    // The button still works when the preference cannot be saved.
  }
});