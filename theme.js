
/** @type {HTMLInputElement | null} */
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

// 1. Abfragen, ob das System (Windows/Mac/iOS/Android) auf Darkmode steht
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// 2. Abfragen, ob der Nutzer beim letzten Besuch schon eine Wahl getroffen hat
const currentTheme = localStorage.getItem("theme");

if (toggleSwitch) {

  // 3. Beim Laden der Seite entscheiden, welches Theme aktiv sein soll
  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    toggleSwitch.checked = true;
  } else if (currentTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else if (prefersDarkScheme.matches) {
    document.documentElement.setAttribute("data-theme", "dark");
    toggleSwitch.checked = true;
  }

  // 4. Die Funktion, die ausgeführt wird, wenn der Kunde auf den Schalter klickt
  /**
   * @param {Event} e
   */
  function switchTheme(e) {
    // Dem Editor sagen, dass e.target ein HTMLInputElement ist
    const target = /** @type {HTMLInputElement} */ (e.target);

    if (target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }

  // 5. Dem Schalter sagen, dass er auf Klicks ("change") hören soll
  toggleSwitch.addEventListener("change", switchTheme);
}