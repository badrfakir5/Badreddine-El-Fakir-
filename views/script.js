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

async function loadProjects() {
  const projectList = document.getElementById("project-list");

  if (!projectList) return;

  projectList.textContent = "Loading projects...";

  try {
    const response = await fetch("projects.json");

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const projects = await response.json();

    projectList.textContent = "";

    projects.forEach(function (project) {
      const card = document.createElement("article");
      card.className = "project-card";

      const status = document.createElement("span");
      status.className = "project-status";
      status.textContent = project.visibility;

      const title = document.createElement("h3");
      title.textContent = project.title;

      const module = document.createElement("p");
      module.textContent = project.module;

      const description = document.createElement("p");
      description.textContent = project.description;

      const link = document.createElement("a");
      link.href = project.url;
      link.textContent = "Repository";

      card.append(status, title, module, description, link);
      projectList.append(card);
    });
  } catch (error) {
    projectList.textContent =
      "Projects could not be loaded. Please try again later.";

    console.error("Failed to load projects:", error);
  }
}

loadProjects();