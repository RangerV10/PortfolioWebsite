document.addEventListener("DOMContentLoaded", () => {
  /** @type {HTMLInputElement | null} */
  const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = localStorage.getItem("theme");

  if (toggleSwitch) {
    if (currentTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      toggleSwitch.checked = true;
    } else if (currentTheme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      toggleSwitch.checked = false;
    } else if (prefersDarkScheme.matches) {
      document.documentElement.setAttribute("data-theme", "dark");
      toggleSwitch.checked = true;
    }

    /**
     * @param {Event} e
     */
    function switchTheme(e) {
      const target = /** @type {HTMLInputElement} */ (e.target);

      if (target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }
    }

    toggleSwitch.addEventListener("change", switchTheme);
  }
});