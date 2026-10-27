// Shared light and dark appearance control.
(() => {
  const storageKey = "taqaddomi-theme";
  let theme = "light";
  try { theme = localStorage.getItem(storageKey) || "light"; } catch { /* Storage is optional. */ }

  function applyTheme(nextTheme) {
    const dark = nextTheme === "dark";
    document.documentElement.classList.toggle("dark", dark);
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.setAttribute("aria-pressed", String(dark));
      button.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
      button.title = dark ? "Switch to light mode" : "Switch to dark mode";
      const icon = button.querySelector("[data-theme-icon]");
      if (icon) icon.textContent = dark ? "dark_mode" : "wb_sunny";
    });
  }

  applyTheme(theme);
  document.addEventListener("DOMContentLoaded", () => applyTheme(document.documentElement.classList.contains("dark") ? "dark" : "light"));
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    if (!event.target.closest("[data-theme-toggle]")) return;
    theme = document.documentElement.classList.contains("dark") ? "light" : "dark";
    applyTheme(theme);
    try { localStorage.setItem(storageKey, theme); } catch { /* Keep this page usable without storage. */ }
  });
})();
